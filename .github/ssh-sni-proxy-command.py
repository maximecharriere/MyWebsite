#!/usr/bin/env python2

# HTTP Host header for SSH through use of ProxyCommand
# Copyright (C) 2016  Kasper Dupont

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation version 3.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import os
import socket
import sys
import threading

def backend_connect(addresses):
    for address in addresses:
        sock = socket.socket(*address[:3])
        try:
            sock.connect(address[4])
        except socket.error as e:
            print type(e), e
        else:
            return sock

    return None

def encode_int(v):
    return ('%08x' % v).decode('hex')

def encode_string(s):
    return encode_int(len(s)) + s

def get_server_banner(sock, hostname):
    payload = '\x02\x00\x00\x00\x0B' + encode_string(
        'SNI ProxyCommand preliminary connection'
        ) + encode_string('')

    padding = ': \r\nHost: %s\r\n\r\n' % hostname

    while (1 + len(payload) + len(padding)) % 8 != 4:
        padding += chr(0)

    sock.send('SSH-2.0-SNI-ProxyCommand / HTTP/1.0\r\n' +
              encode_string(chr(len(padding)) + payload + padding))
    data = ''
    while '\n' not  in data:
        data += sock.recv(4096)
    return data.split('\n')[0] + '\n'

def copy_data(src):
    while True:
        data = src.recv(4096)
        if not data:
            os.dup2(2, 1)
            return
        os.write(1, data)

def packet_length(packet):
    if len(packet) < 4:
        return 4
    return int(packet[:4].encode('hex'), 16) + 4

def bytes_needed(data):
    banner, packet = data.split('\n', 1)
    return max(packet_length(packet) - len(packet), 0)

def mangle(data, hostname):
    banner, packet = data.split('\n', 1)
    l = packet_length(packet)
    trail = packet[l:]
    packet = packet[:l]

    padl = ord(packet[4])
    packet_data = packet[5:-padl]

    new_padding = '\r\nHost: %s\r\n\r\n' % hostname
    while (len(new_padding) % 8) != (padl % 8):
        new_padding += chr(0)

    padl = len(new_padding)
    assert padl < 256

    packet_payload = chr(padl) + packet_data + new_padding

    return banner + '\n' + encode_string(packet_payload) + trail

def main(argv):
    unused, hostname, port = argv

    addresses = socket.getaddrinfo(hostname, port, 0, socket.SOCK_STREAM)
    sock = backend_connect(addresses)
    server_banner = get_server_banner(sock, hostname)
    os.write(1, server_banner)

    data = os.read(0, 64)
    while not '\n' in data:
        data += os.read(0, 64)
    while True:
        n = bytes_needed(data)
        if not n:
            break
        data += os.read(0, n)

    sock = backend_connect(addresses)
    sock.send(mangle(data, hostname))
    server_banner2 = sock.recv(len(server_banner))
    assert server_banner2 == server_banner

    threading.Thread(target = copy_data,
                     args = [sock]).start()

    while True:
        data = os.read(0, 4096)
        if not data:
            sock.shutdown(socket.SHUT_WR)
            return
        sock.send(data)

if __name__ == '__main__':
    main(sys.argv)

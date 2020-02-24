import socket

s = socket.socket()
port = 12345
s.connect(('127.0.0.1', port))

while True:
    data = s.recv(2048)
    if not data: break
    print (data.decode().replace('\r\n', '\n'))

s.close()
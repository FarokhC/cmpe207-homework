import socket

s = socket.socket()
port = 23
s.connect(('94.142.241.111', port))

while True:
    data = s.recv(2048)
    if not data: break
    print (data.decode().replace('\r\n', '\n'))

s.close()
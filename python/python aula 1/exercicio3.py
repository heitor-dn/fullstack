quantdias = int(input("digite a quantidade de dias: "))
dias = quantdias*86400
quanthoras = int(input("digite a quantidade de horas: "))
horas = quanthoras*3600
quantmin = int(input("digite a quantidade de minutos: "))
minutos = quantmin*60
quantseg = int(input("digite a quantidade de segundos: "))
segundos = quantseg
tempo_total = dias+horas+minutos+segundos
print("o tempo total foi de: %d" % tempo_total)
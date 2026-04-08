quilometragem = float(input("digite os KM rodados: "))
Km = 0.15*quilometragem
print("o valor por Km é: %.2f" % Km)
dias = int(input("digite os dias de uso: "))
diária = 60*dias
print("sua diária é: %d" % diária)
aluguel = diária+Km
print("o valor do aluguel é: %.2f" % aluguel)
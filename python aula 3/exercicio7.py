viagem=int(input("Digite a distância que deseja percorrer(em km): "))
if viagem<=200:
    valor = viagem*0.50
    print("Sua passagem custará R$%.2f" % valor)
else:
    valor = viagem*0.45
    print("Sua passagem custará R$%.2f" % valor)
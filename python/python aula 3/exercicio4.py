salario=float(input("Digite seu salário atual: "))
if salario>1250:
    novo = salario*1.1
    print("Parbéns! Você recebeu um aumento de 10%!")
    print("Seu novo salário é: %.2f" % novo)
else:
    novo = salario*1.15
    print("Parabéns! Você recebeu um aumento de 15%")
    print("Seu novo salário é: %.2f" % novo)

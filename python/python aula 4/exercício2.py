valor1=int(input("Digite um número inteiro: "))
valor2=int(input("Digite outro número inteiro: "))
valor3=int(input("Digite um último número inteiro: "))
resultado= sorted([valor1, valor2, valor3], reverse=True)
if (valor1==valor2) or (valor1==valor3) or (valor2==valor3):
    print("Os números inseridos devem ser diferentes.")
else:
    print("Os números organizados em ordem decrescente são:", resultado)
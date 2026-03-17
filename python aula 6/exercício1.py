contador=int(input("Digite a quandidade de numeros a serem testados: "))

totalprimos = 0

for i in range(1,contador+1):

    numero=int(input(f"Digite o numero {i}: "))

    if numero > 1:
        contprimos=1
        for j in range(2,numero):
            if numero % j == 0:
                contprimos = 0
                break

        totalprimos+=contprimos
            
print(f"Você digitou {totalprimos} números primos de um total de {contador} números.")
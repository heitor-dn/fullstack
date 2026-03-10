soma=0
quantidade=0
while True:
    x=int(input("Digite um número ou 0 para parar: "))
    quantidade+=1
    soma=soma+x
    if x==0:
        break
print(f"A soma é: {soma}")
print(f"Foram digitados {quantidade-1} números.")
print(f"A média aritmética é: {soma/(quantidade-1)}")
    

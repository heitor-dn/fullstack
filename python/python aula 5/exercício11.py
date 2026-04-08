x=0
y=0
z=0
f=0
i=0
while True:
    idade=int(input("Digite sua idade: "))
    if idade<0:
        break
    x+=idade
    i+=1
    sexo=input("Você é homem ou mulher? ")
    salario=float(input("Quanto você recebe? "))
    if sexo == "homem":
        y+=1
        z+=salario
        media=z/y
    if sexo == "mulher" and salario<600:
        f+=1
print(f"A média da idade do grupo é {x/i}")
print(f"A média de salario dos homens é de : {z/y}")
print(f"A quantidade de mulheres que recebe menos que R$600.00 é de : {f}")


        


        


       


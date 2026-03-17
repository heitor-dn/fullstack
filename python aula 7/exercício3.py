x=int(input("Digite um numero: "))
y=int(input("Digite outro numero: "))
def maximo(x,y):
    if x>y:
        print(f"O maior é {x}")
    elif x<y:
        print(f"O maior é {y}")
    else:
        print("Os números são iguais")

maximo(x,y)
from math import sqrt
n1=int(input("Digite um número: "))
n2=int(input("Digite outro número: "))
n3=int(input("Digite outro número: "))
def conta(n1,n2,n3):
    grande = sqrt(n1) + sqrt(n2) + sqrt(n3) + (n1+n2)/2 +(n2+n3)/2 + (n1+n3)/2
    return grande
print(f"o resultado é: {conta(n1,n2,n3):.2f}")
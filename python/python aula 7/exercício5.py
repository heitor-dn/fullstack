x=int(input("Altura do triângulo (em cm): "))
y=int(input("Base do triângulo (em cm): "))
def tri(x,y):
    area=x*y/2
    return area
print(f"A área do seu triângulo é de: {tri(x,y):.2f} cm^2")

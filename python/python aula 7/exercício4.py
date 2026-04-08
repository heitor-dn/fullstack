x=int(input("Número 1: "))
y=int(input("Número 2: "))
def multiplo(x,y):
    if x%y==0:
        return True
    else:
        return False
print(multiplo(x,y))

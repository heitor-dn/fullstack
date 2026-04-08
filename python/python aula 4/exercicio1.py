preço=float(input("Digite o preço do produto: ")) 
cod=int(input("Digite o código do produto: "))
if cod==1:
    proc= "Sul"
elif cod==2:
    proc= "Norte"
elif cod==3:
    proc= "Leste"
elif cod==4:
    proc= "Oeste"
elif cod==5 or cod==6:
    proc= "Nordeste"
elif cod==7 or cod==8 or cod==9:
    proc= "Sudeste"
elif 10<=cod<=20:
    proc= "Centro-Oeste"
elif 25<=cod<=30:
    proc= "Nordeste"
else:
    proc= "Importado"

print(f"O preço do seu produto é de R${preço:.2f}")  
print("e sua procedência é: %s" % proc)

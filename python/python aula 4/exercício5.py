codigo=int(input("Digite o código do produto: "))
if codigo==1:
    classi= "Alimento não perecível"
elif codigo==2 or codigo==3 or codigo==4:
    classi= "Alimento perecível"
elif codigo==5 or codigo==6:
    classi= "Vestuário"
elif codigo==7:
    classi= "Higiene pessoal"
elif 8<=codigo<=15:
    classi= "Limpeza e utensílios domésticos"
else:
    classi= "inválido"

print(f"A classificação de seu produto é: {classi}")
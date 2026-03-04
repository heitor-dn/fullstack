alt=float(input("Insira sua altura: "))
sexo=input("Você é homem ou mulher? ")
if sexo=="homem":
    peso=(72.7*alt) - 58
    print("Seu peso ideal é: %.2f" %peso)
elif sexo=="mulher":
    peso=(62.1*alt) - 44.7
    print("Seu peso ideal é: %.2f" %peso)
elif (sexo!="homem") or (sexo!="mulher"):
    print("Por favor, responda a questão apropriadamente.")



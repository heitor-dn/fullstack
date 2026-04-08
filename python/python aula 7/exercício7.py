sexo=input("Você é homem ou mulher: ")
peso=float(input("Quanto você pesa: "))
def perm(sexo,peso):
    if (sexo=="mulher" and peso<50) or (sexo=="homem" and peso<60):
        return "você não pode doar sangue"
    elif sexo!= "homem" or sexo!= "mulher":
        return "Por favor inserir uma das opções da pergunta."
    else:
        return "você pode doar sangue"
    
print(perm(sexo,peso))
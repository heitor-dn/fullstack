atual = int(input("Digite o ano atual: "))
nasc = int(input("Digite seu ano de nascimento: "))
idade = atual-nasc
if idade>=18:
    print("Você ja pode tirar sua CNH.")
if idade<18:
    print("Você ainda não pode tirar sua CNH.")
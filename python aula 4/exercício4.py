from datetime import date
hoje = date.today()
anoatual= hoje.year
nasc=int(input("Digite o ano em que nasceu: "))
idade= anoatual-nasc
if idade<16:
    vot="não pode"
    cart="não pode"
elif 16<=idade<18:
    vot="pode"
    cart="não pode"
elif idade>=18:
    vot="pode"
    cart="pode"

print(f"Você {vot} votar, e {cart} tirar sua carteira de motorista")
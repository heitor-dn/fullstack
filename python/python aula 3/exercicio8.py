from math import ceil
altura=float(input("Digite a altura do cilindro em metros: "))
raio=float(input("Digite o raio do cilindro em metros: "))
pi=3.1415
areaA= altura*(2*pi*raio)
areaB= pi*(raio**2)
areaT= areaA+areaB
print("Área a ser pintada: %.2f" % areaT)
quant= areaT/3
print("Quantidade de litros necessários: %.2f" % quant)
latas=5
quantlt= ceil(quant/latas)
print("Quantidade de latas de tinta: %d" % quantlt)
if quantlt==1:
    print("Preço unitário da lata: R$ 50.00")
    print("Custo total: R$ 50.00")
elif quantlt==2:
    print("Preço unitário da lata: R$ 48.00")
    custo= 48*quantlt
    print("Custo total: R$ %.2f" %custo)
elif quantlt==3:
    print("Preço unitário da lata: R$ 46.00")
    custo= 46*quantlt
    print("Custo total: R$ %.2f" %custo)
else:
    print("Preço unitário da lata: R$ 45.00")
    custo= 45*quantlt
    print("Custo total: R$ %.2f" %custo)




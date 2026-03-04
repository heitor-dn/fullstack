valorhoras = int(input("digite o valor recebido por hora: "))
valorhora = valorhoras
quanthoras = int(input("digite a quantidade de horas trabalhadas no mes: "))
horas = quanthoras
salario = valorhora*horas
print("+ Salário bruto: R$ %d" % salario)
Ir = salario*0.11
print("- IR: R$ %.2f" % Ir)
Inss = salario*0.08
print("- INSS: R$ %.2f" % Inss)
sindicato = salario*0.05
print("- Sindicato: R$ %.2f" % sindicato)
salariol= salario - (Ir+Inss+sindicato)
print("+ Salário liquido: R$ %.2f" % salariol)
rodando = True

from funções import buscarvideo,criarlista,entrarnalista #importei todas as funções necessárias para o funcionamento do código

while rodando:
    print("Bem vindo!")
    print("1 - criar conta")
    print("2 - login")
    print("0 - sair")
    inicio= int(input(""))
    if inicio == 0:
        print("Até logo!")
        rodando = False
    
    # cadastro
    voltar = False
    if inicio == 1:
        usuário=str(input("Escolha um nome de usuário: "))
        senha=str(input("Crie sua senha: "))

    # adicionar o usuário e senha
        arquivo = open("teste.txt", "a", encoding="utf-8")
        arquivo.write(f"{usuário},{senha}\n")
        arquivo.close()
        voltar = True
        with open(f"favoritos_{usuário}.txt", "w", encoding="utf-8") as f: # essa linha foi feita posteriormente para adicionar um arquivo ao cadastrar na página
            pass
        print("V para voltar ao menu de login")
        voltando = input("")
        if voltando == "V" and voltar:
            inicio = 2
    # login
    prosseguir = False  #variável para permitir o avanço
    if inicio == 2:
        login_usuário = str(input("Insira seu nome de usuário: "))
        login_senha = str(input("Digite sua senha: "))

        arquivo = open("teste.txt", "r", encoding="utf-8")
        for linha in arquivo:
            dados = linha.strip().split(",") # strip e split para tirar os espaços entre os itens e separá-los por ";"
            if len(dados) == 2:
                if dados[0] == login_usuário and dados[1] == login_senha:
                    prosseguir = True
                    break
        arquivo.close()


        if prosseguir:
            print(f"Bem Vindo {login_usuário}!")
            noapp = True
            while noapp: # manter o usuário logado
                print("1 - Buscar videos")
                print("2 - Gerenciar favoritos")
                print("0 - Logout")
                opção = int(input(""))
                if opção == 0:
                    noapp = False
                elif opção == 1:
                    buscarvideo("filmes.txt")
                elif opção == 2:
                    print("1 - Criar lista de favoritos")
                    print("2 - Visualizar lista de favoritos") 
                    verfavs = int(input(""))
                    if  verfavs == 1:
                        favs = input("Digite o nome da sua lista de favoritos a ser criada: ")
                        criarlista(login_usuário, favs)
                        verfavs = 2
                    elif verfavs == 2:
                        checar= input("Digite o nome da lista de favoritos que deseja visualizar: ")
                        entrarnalista(login_usuário,checar)
                        
        else:
            print("usuario ou senha incorretos")
            break

    



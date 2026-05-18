# Arquivo separado para as funções, para melhor manipulação e limpeza do código

def buscarvideo(filmes):
    index = input("Digite o nome do filme que procura: ")
    encontrou = False
    
    with open(filmes, "r", encoding="utf-8") as f:
        for linha in f:
            
            dados = linha.strip().split(";")
            if index in dados[0]:
                print(f"Vídeo encontrado: {dados[0]}")
                print(f"Gênero: {dados[1]}")
                print(f"Sinopse: {dados[2]}")
                print(f"Curtidas: {dados[3]}")
                
                encontrou = True
                
                print("1 - Curtir Filme")
                print("2 - Descurtir")
                print("3 - Voltar")
            
                menu = int(input(""))
                if menu == 1:
                    curtida("filmes.txt", dados[0])
                elif menu == 2:
                    descurtida("filmes.txt", dados[0])
                else:
                    opção = 1
            
    
    if not encontrou:
        print("Vídeo não encontrado.")
        

def curtida(filmes, procurado):
    linhasatt = []
    
    with open(filmes, "r", encoding="utf-8") as v:
        for linha in v:
            dados = linha.strip().split(";") # strip e split para tirar os espaços entre os itens e separá-los por ";"
            nome = dados[0]
            genero = dados[1]
            sinopse = dados[2]
            curtidas = int(dados[3]) # transformar as curtidas em número, para posteriormente somar ou subitrair dela
            if nome == procurado:
                curtidas += 1  
                print(f"Você curtiu {nome}!")
            
            linhasatt.append(f"{nome};{genero};{sinopse};{curtidas}\n") # desenha a linha nova no lugar da antiga

    with open(filmes, "w", encoding="utf-8") as arquivo:
        arquivo.writelines(linhasatt) # reescreve o arquivo todo, mudando apenas a linha nova adicionada no lugar da antiga
        
def descurtida(filmes, procurado):
    linhasatt = []
    
    with open(filmes, "r", encoding="utf-8") as v:
        for linha in v:
            dados = linha.strip().split(";")
            nome = dados[0]
            genero = dados[1]
            sinopse = dados[2]
            curtidas = int(dados[3]) 
            if nome == procurado:
                curtidas -= 1  
                print(f"Você descurtiu {nome} :(")
            
            linhasatt.append(f"{nome};{genero};{sinopse};{curtidas}\n")

    with open(filmes, "w", encoding="utf-8") as arquivo:
        arquivo.writelines(linhasatt)
        
def criarlista(login_usuário, favs):
    
    with open(f"favoritos_{login_usuário}.txt", "a", encoding="utf-8") as f:
        f.write(f"LISTA:{favs}\n")
    print(f"Lista '{favs}' criada!")
    
def entrarnalista(login_usuário,checar):
    with open (f"favoritos_{login_usuário}.txt", "r", encoding="utf-8") as c:
        for linha in c:
            if linha.startswith(f"LISTA:{checar}"):  # aqui pega o nome digitado no imput e confere para ver se existe uma lista com tal nome
                partes = linha.strip().split(";")
                
                nome_lista = partes[0].replace("LISTA:", "")
                print(f"\nEXIBINDO LISTA: {nome_lista}")
                
                for i in range(1, len(partes)):
                    print(f"{i} - {partes[i]}")
                print("-"*30)
                print("1 - Editar nome da lista")
                print("2 - Adicionar filme à lista")
                print("3 - Remover filme da lista")
                print("4 - Excluir lista")
                fazeroq = int(input(""))
    if fazeroq == 1:
        nomenovo= input("Digite o novo nome da sua lista de favoritos: ")
        editarlista(login_usuário, checar, nomenovo)
    elif fazeroq == 2:
        filme = input(f"Digite o nome do filme que deseja adicionar à '{checar}': ")
        achou = False
        with open("filmes.txt","r", encoding="utf-8") as r:
            for linha in r:
                dados = linha.split(";")
                if filme == dados[0]:                
                    achou = True
                    break
        if achou:              
            addfilme(login_usuário, checar, filme)
        else:
            print("Filme não registrado na plataforma.")
    elif fazeroq == 3:
        rem = input("Digite o filme que deseja remover: ")
        if rem in linha:
            removerfilme(login_usuário, checar, rem)
        else:
            print("Filme não encontrado na lista.")
    elif fazeroq == 4:
        print("Caso realmente deseje excluir a lista, digite 1")
        ctz = int(input(""))
        if ctz == 1:
            excluirlista(login_usuário, checar)
        else:
            print("Sua lista se mantém.")
                               
                    
def editarlista(login_usuário, checar, nomenovo):
    linhaatt = []
    with open (f"favoritos_{login_usuário}.txt", "r", encoding="utf-8") as c:
        for linha in c:
            if linha.startswith(f"LISTA:{checar}"):
                novalinha = linha.replace(f"LISTA:{checar}", f"LISTA:{nomenovo}")
                linhaatt.append(novalinha)
            else:
                linhaatt.append(linha)
    with open(f"favoritos_{login_usuário}.txt", "w", encoding="utf-8") as f:
        f.writelines(linhaatt)  # writelines foi a melhor opção pois trabalhei com mais de uma linha sendo adicionada
    print(f"O nome de sua lista agora é {nomenovo}")
        
def addfilme(login_usuário, checar, filme):
    linhaatt = []
    with open (f"favoritos_{login_usuário}.txt", "r", encoding="utf-8") as c:
        for linha in c:
            if linha.startswith(f"LISTA:{checar}"):
                novalinha = linha.strip() + f";{filme}\n" #concatenação de string, com o novo filme adicionado ja separado por ;
                linhaatt.append(novalinha)
            else:
                linhaatt.append(linha)
    with open(f"favoritos_{login_usuário}.txt", "w", encoding="utf-8"   ) as f:
        f.writelines(linhaatt)
    print(f"{filme} adicionado com sucesso!")

def removerfilme(login_usuário, checar, rem):
    linhaatt = []
    with open (f"favoritos_{login_usuário}.txt", "r", encoding="utf-8") as c:
        for linha in c:
            if linha.startswith(f"LISTA:{checar}"):
                novalinha = linha.replace(f";{rem}","")
                linhaatt.append(novalinha)
            else:
                linhaatt.append(linha)
    with open(f"favoritos_{login_usuário}.txt", "w", encoding="utf-8") as f:
        f.writelines(linhaatt)
        
def excluirlista(login_usuário, checar):
    linhaatt = []
    with open (f"favoritos_{login_usuário}.txt", "r", encoding="utf-8") as c:
        for linha in c:
            if not linha.startswith(f"LISTA:{checar}"):
                linhaatt.append(linha)
    with open(f"favoritos_{login_usuário}.txt", "w", encoding="utf-8") as f:
        f.writelines(linhaatt)
    print("Lista excluída.")
    
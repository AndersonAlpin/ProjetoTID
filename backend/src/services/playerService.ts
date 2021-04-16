import { v4 as uuid } from "uuid";
import { PlayerClass } from "./../models/Player";
import Player from "../models/Player";

export default {
  /**
   * Função realizar validação de existente e caso não exista cria no banco o player e encriptando a senha.
   * @param body: Player.
   * @typeParam body: Paramentro da função aceita um objeto contendo as entidade: nick - string, email - string, senha - string.
   */
  async newRegister(body: PlayerClass) {
    const newPlayer = new PlayerClass();
    if (!body.password)
      return { erro: "Realizar preenchimento da Senha/Password!" };
    if (!body.nick) return { erro: "Realizar preenchimento do seu Nick!" };
    if (!body.email) return { erro: "Realizar preenchimento do E-mail!" };

    const id: string = uuid();
    newPlayer.id = id;
    newPlayer.email = body.email;
    newPlayer.nick = body.nick;
    newPlayer.password = body.password;

    let resultNewRegister;
    const checkEmail = await Player.findOne({ email: body.email });
    if (!checkEmail) {
      const checkNick = await Player.findOne({ nick: body.nick });
      if (!checkNick) {
        await Player.create(newPlayer)
          .then((result) => {
            resultNewRegister = { sucesso: "Cadastro realizado com sucesso!" };
          })
          .catch((err) => {
            resultNewRegister = { erro: "Falha ao realizar ao cadastrar." };
            console.log(err);
          });
        return resultNewRegister;
      }
      return { erro: "Nick existente!" };
    }
    return { erro: "E-mail existente!" };
  },

  /**
   * Função realizar pega todos os players cadastrado no banco e retorna eles, sem retornar entidade da senha.
   */
  async getAll() {
    const palyersObj = await Player.find();
    let result: PlayerClass[] = [];
    palyersObj.forEach((player) => {
      const newPlayer = new PlayerClass();
      newPlayer.id = player.id;
      newPlayer.email = player.email;
      newPlayer.nick = player.nick;
      result.push(newPlayer);
    });
    return result;
  },

  /**
   * Função realizar validação de Query existente e pesquisa de acordo o critério da query da requisição no banco.
   * @param query: any
   * @typeParam query: Paramentro da função recebi um Objeto aceitando um dos 3 argumento/entidade {id:string, nick:string, email:string}.
   */
  async getSearchQuery(query: any) {
    if (query.id) {
      const palyerObj = await Player.findOne({ id: query.id });
      if (!palyerObj)
        return {
          message: "Não tem registro com base no critério de pesquisa Id.",
        };
      const newPlayer = new PlayerClass();
      newPlayer.id = palyerObj.id;
      newPlayer.nick = palyerObj.nick;
      newPlayer.email = palyerObj.email;
      return newPlayer;
    } else if (query.email) {
      const palyerObj = await Player.findOne({ email: query.email });
      if (!palyerObj)
        return {
          message: "Não tem registro com base no critério de pesquisa E-mail.",
        };
      const newPlayer = new PlayerClass();
      newPlayer.id = palyerObj.id;
      newPlayer.nick = palyerObj.nick;
      newPlayer.email = palyerObj.email;
      return newPlayer;
    } else if (query.nick) {
      const palyerObj = await Player.findOne({ nick: query.nick });
      if (!palyerObj)
        return {
          message: "Não tem registro com base no critério de pesquisa Nick.",
        };
      const newPlayer = new PlayerClass();
      newPlayer.id = palyerObj.id;
      newPlayer.nick = palyerObj.nick;
      newPlayer.email = palyerObj.email;
      return newPlayer;
    }
    return {
      erro:
        "Não foi informado nem um critério de pesquisa. Por gentileza informar um dos 3(id, email, nick).",
    };
  },
};

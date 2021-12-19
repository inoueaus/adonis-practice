import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    console.log(ctx.request);
    
    return ctx.response.json({})
  }

  public async register(ctx: HttpContextContract) {}

  public async logout(ctx: HttpContextContract) {}

  public async changePassword(ctx: HttpContextContract) {}
}

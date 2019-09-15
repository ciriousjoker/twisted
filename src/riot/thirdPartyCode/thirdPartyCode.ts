import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes'
import { Regions } from '../../enum'
import { BaseApi } from '../base'
import { endpointsV4 } from '../../enum/endpoints.enum'
import { ThirdPartyCodeDTO } from '../../dto/ThirdPartyCode/ThirdPartyCode.dto'

/**
 * Third party methods
 */
export class ThirdPartyCode extends BaseApi {
  private errorHandler (e: any) {
    const { statusCode } = e
    if (statusCode !== INTERNAL_SERVER_ERROR && statusCode !== NOT_FOUND) {
      throw e
    }
  }
  /**
   * Valid codes must be no longer than 256 characters and only use valid characters: 0-9, a-z, A-Z, and -
   * @param encryptedSummonerId
   * @param region
   */
  public async get (encryptedSummonerId: string, region: Regions): Promise<ThirdPartyCodeDTO> {
    let code
    const params = {
      encryptedSummonerId
    }
    try {
      code = await this.request<string>(region, endpointsV4.ThirdPartyCode, params)
    } catch (e) {
      this.errorHandler(e)
      code = null
    }
    return {
      code
    }
  }
}

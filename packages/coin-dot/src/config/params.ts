
export const TX_ADDRESS_PRE = '00'

export enum COIN_TYPE {
  DOT = '80000162', KSM = '800001b2'
}

export enum DOT_ADDRESS_TYPE {
  DOT = 0, KSM = 2
}

export const METHOD_CALL_INDEX = {
  DOT: {
    transfer: '0500',
    bond: '0700',
    bondExtra: '0701',
    unbond: '0702',
    nominate: '0705',
    withdraw: '0703',
    chill: '0706'
  },
  KSM: {
    transfer: '0400',
    bond: '0600',
    bondExtra: '0601',
    unbond: '0602',
    nominate: '0605',
    withdraw: '0603'
  }
}

export enum payeeType {
  stash = '01',
  staked = '00',
  controller = '02',
}

export enum ValueMode {
  singleByteMode = 'singleByteMode',
  twoByteMode = 'twoByteMode',
  foreByteMode = 'foreByteMode',
  bigIntegerMode = 'bigIntegerMode'
}

export const SCRIPT_PARAMS = {
  DOT:{
    TRANSFER : {
      script:
        '03020E01C7070000000162CAA0C70002CC071000CAAC570002A2ACD70022FFF6CAACD7002CFFFBA2ACD70031FFFBA2ACD70036FFFBCAACC7003B04CAACC7003F04CAAC570043CAAC570063DC07C003444f54CC0FC00753533538505245CC0F1000CAAC5F00025AF09FC00FBAFCCE6C07230804DDE09700DAACD7C022FFF60AD207CC05065052455353425554546f4e',
      signature:
        '00003044022037AC2FFEEA6AF1DC07793EDBAC2FF1B6DE1E2812AD78D4C0D3CB950C6913726F022064370FC4A38247BB531396AD3C866DDB5A5350150C542806D9C1994A76F86645'
    },
    BOND: {
      script:
        '03020E01C7070000000162CAA0C70002CC071000CAAC570002A2ACD70022FFF6CAAC17002CCAACD7002DFFFBA2ACD70032FFFBA2ACD70037FFFBCAACC7003C04CAA6C70004CAAC570044CAAC570064DC07C003444f54DC07C004426f6e64CC0FC00753533538505245CC0F1000CAAC5F00025AF09FC00FBAFCCE6C07230804DDE09700DAACD7C022FFF60AD207CC05065052455353425554546f4e',
      signature:
        'ㄢ304502202199859BC3BB3C2ACC00272286B8D3FA3E326DC807553D15669FC22D7B82B8F8022100BE967FEA54A9466850C360BE24EFE481975234B650F9ED5EAEBFD06E80AC9BA4'
    }, 
    BOND_EXTRA: {
      script:
        '03020E01C7070000000162CAA0C70002A2ACD70002FFF6CAACD7000CFFFBA2ACD70011FFFBA2ACD70016FFFBCAACC7001B04CAACC7001F04CAAC570023CAAC570043DC07C003444f54DC07C007426f6e64457874DAACD7C002FFF60AD207CC05065052455353425554546f4e',
      signature:
        '00304502202CA928F80508DA5AECD768C6CB27B3C2C452D9788883B86FA40D9F089C8EFFCB022100FAAD5F3957A2EF2AB1C434AF027FA726A90FC9364D3E02EE817600626717C843'
    },
    UNBOND: {
      script:
        '03020E01C7070000000162CAA0C70002A2ACD70002FFF6CAACD7000CFFFBA2ACD70011FFFBA2ACD70016FFFBCAACC7001B04CAACC7001F04CAAC570023CAAC570043DC07C003444f54DC07C006556e626f6e64DAACD7C002FFF60AD207CC05065052455353425554546f4e',
      signature:
        '30460221008748B8EB0559F5A0B5A24AFCFEDA61F1BFF88E7979FEBD109D47CBAB78A898010221008FA0D28A420069E6FE3B1F060A8B7176BC78B3B04579920F846879FF0B38A74B'
    },
    NOMINATE: {
      singleHash: {
        script:
          '03020E01C7070000000162CAA0C70002A2AC170059CAAC97005ACAACD70002FFFBA2ACD70007FFFBA2ACD7000CFFFBCAACC7001104CAACC7001504CAAC570019CAAC570039DC07C003444f54DC07C0064e6f6d696e74D207CC05065052455353425554546f4e',
        signature:
          '003045022100DC4EFBB4018886F2B3EE78817CCFA69A8C04D97EDE8CA007130D74983F9D3DD502207F181DD24288A2B809ADA6241EEAD72E94538A8B5A9A076D98B7E9A7AD6CB981'
      },
      doubleHash: {
        script:
          '03020E01C7070000000162CAA0C70002A2AC170059CAAC97005ACAACD70002FFFBA2ACD70007FFFBA2ACD7000CFFFBCAACC7001104CAACC7001504CAAC570019CAAC5700395A709FC00E250700CAF09700DC07C003444f54DC07C0064e6f6d696e74D207CC05065052455353425554546f4e',
        signature:
          '304602210096D39AE252F24B8015187E93DCB27F642F6C87A5B4C22F3F1F01B9D0DE01986E022100ADF61CCE67428EA2F2139101DC483B428A59063F7A800D28220408EB0707FC7B'
      }
    },
    WITHDRAW: {
      script:
        '03020E01C7070000000162CAA0C700021AACC7C002040C00000000CC07C004000000001507C009BAACC7CC0204040F02CAACD70006FFFBA2ACD7000BFFFBA2ACD70010FFFBCAACC7001504CAACC7001904CAAC57001DCAAC57003DDC07C003444f54DC07C006576974686472D207CC05065052455353425554546f4e',
      signature:
        '3046022100C223174F70194926F1E000B8887F1900C0D785BDBE7110D8BD43B6761A1A3564022100BEAB252B60C3BC08963FC016E5206F93CFCA8FB62CC90559184DD7D3016953E7'
    }

  },
  KSM: {
    TRANSFER: {
      script:
        '03020E01C70700000001B2CAA0C70002CC071000CAAC570002A2ACD70022FFF6CAACD7002CFFFBA2ACD70031FFFBA2ACD70036FFFBCAACC7003B04CAACC7003F04CAAC570043CAAC570063DC07C0034b534dCC0FC00753533538505245CC0F1002CAAC5F00025AF09FC00FBAFCCE6C07230804DDE09700DAACD7C022FFF60CD207CC05065052455353425554546f4e',
      signature:
        '0000304402204007801EDD02289A1566636F1B63D8F81B45C8E3DAF4954C61AE7B555CFD1FA602202773CD1315D787D53CC956F540B68C5DB806FEE254139CD8F02F556A1BAFA7DC'
    },
    BOND: {
      script:
        '03020E01C70700000001B2CAA0C70002CC071000CAAC570002A2ACD70022FFF6CAAC17002CCAACD7002DFFFBA2ACD70032FFFBA2ACD70037FFFBCAACC7003C04CAA6C70004CAAC570044CAAC570064DC07C0034b534dDC07C004426f6e64CC0FC00753533538505245CC0F1002CAAC5F00025AF09FC00FBAFCCE6C07230804DDE09700DAACD7C022FFF60CD207CC05065052455353425554546f4e',
      signature:
        '00003044022054C4D1F81B043D19B238402E55285AB9BE0AA381026A228C1A43818550FDAF1A022051B7F4B2583B0A983D8991EA3AF09979B422B4BA8BF4FBAF6F365D0820D87A67'
    },
    BOND_EXTRA: {
      script:
        '03020E01C70700000001B2CAA0C70002A2ACD70002FFF6CAACD7000CFFFBA2ACD70011FFFBA2ACD70016FFFBCAACC7001B04CAACC7001F04CAAC570023CAAC570043DC07C0034b534dDC07C007426f6e64457874DAACD7C002FFF60CD207CC05065052455353425554546f4e',
      signature:
        '003045022078B69F8B1E20CB722A2628EFE01AE5C0B4160533595D949A9C940255ACE30AE4022100E60F87E439C426FBEE9B6A4AD97B2A820501857A0D3126E508C32551133927BD'
    },
    UNBOND: {
      script:
        '03020E01C70700000001B2CAA0C70002A2ACD70002FFF6CAACD7000CFFFBA2ACD70011FFFBA2ACD70016FFFBCAACC7001B04CAACC7001F04CAAC570023CAAC570043DC07C0034b534dDC07C006556e626f6e64DAACD7C002FFF60CD207CC05065052455353425554546f4e',
      signature:
        '0030450221008D024F8E7B5EA2DE278F2F6077FE7A256294EF8D9D21C226491FE8FF9A20602C022056C31E390F935C6CBC5754D40EEE1EDF00E6F99227238D8431C4A0CD49A6F664'
    },
    NOMINATE: {
      singleHash:{
        script:
          '03020E01C70700000001B2CAA0C70002A2AC170059CAAC97005ACAACD70002FFFBA2ACD70007FFFBA2ACD7000CFFFBCAACC7001104CAACC7001504CAAC570019CAAC570039DC07C0034b534dDC07C0064e6f6d696e74D207CC05065052455353425554546f4e',
        signature:
          '003045022050E47F2D21A88EB79DCB0AAD6B085B204C4A1103D90B2B19CB5DDC0582C6A73B0221008BE23FAE193108E22F56D97C7E2B38BC53A345B5191E2DF0106C52B9721E0F94'
      },
      doubleHash:{
        script:
          '03020E01C70700000001B2CAA0C70002A2AC170059CAAC97005ACAACD70002FFFBA2ACD70007FFFBA2ACD7000CFFFBCAACC7001104CAACC7001504CAAC570019CAAC5700395A709FC00E250700CAF09700DC07C0034b534dDC07C0064e6f6d696e74D207CC05065052455353425554546f4e',
        signature:
          '3046022100CF50DC25FA98B4FC9D545D8712836A949E92EA1F862BA3E7C6358C87DCA8AF57022100A04B35B38C897AC4ED0D93CD27E401DB6C85E25D83C32D51F176F92C11FBFE5D'

      }
    },
    WITHDRAW: {
      script:
        '03020E01C70700000001B2CAA0C700021AACC7C002040C00000000CC07C004000000001507C009BAACC7CC0204040F02CAACD70006FFFBA2ACD7000BFFFBA2ACD70010FFFBCAACC7001504CAACC7001904CAAC57001DCAAC57003DDC07C0034b534dDC07C006576974686472D207CC05065052455353425554546f4e',
      signature:
        '3046022100C2409FB6AC6E7B8F851C58CD16A8C9B1E9D3FD34EB57D10909C5D1937323EFA3022100D775322BE66104258839F9444BA1114A8EDB07E620F5EEF7F8D2A1CF052E047C'
    }

  }


}

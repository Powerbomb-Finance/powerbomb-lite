export function getParameterCaseInsensitive(object, key) {
  return object[Object.keys(object)
    .find(k => k.toLowerCase() === key.toLowerCase())
  ];
}

export function getPoolPrices(tokens, prices, pool, chain = "eth") {
  console.log(pool);

  //if (pool.w0 != null) return getValuePrices(tokens, prices, pool);
  //if (pool.buniPoolTokens != null) return getBunicornPrices(tokens, prices, pool);
  //if (pool.poolTokens != null) return getBalancerPrices(tokens, prices, pool);
  // if (pool.isGelato) return getGelatoPrices(tokens, prices, pool);
  if (pool.token0 != null) return getUniPrices(tokens, prices, pool);
  // if (pool.virtualPrice != null) return getCurvePrices(prices, pool); //should work for saddle too
  //if (pool.token != null) return getWrapPrices(tokens, prices, pool);
}

function getUniPrices(tokens, prices, pool, chain="eth")
{
  var t0 = getParameterCaseInsensitive(tokens,pool.token0);
  var p0 = getParameterCaseInsensitive(prices,pool.token0)?.usd;
  var t1 = getParameterCaseInsensitive(tokens,pool.token1);
  var p1 = getParameterCaseInsensitive(prices,pool.token1)?.usd;
  if (p0 == null && p1 == null) {
    console.log(`Missing prices for tokens ${pool.token0} and ${pool.token1}.`);
    return undefined;
  }
  if (t0?.decimals == null) {
    console.log(`Missing information for token ${pool.token0}.`);
    return undefined;
  }
  if (t1?.decimals == null) {
    console.log(`Missing information for token ${pool.token1}.`);
    return undefined;
  }
  var q0 = pool.q0 / 10 ** t0.decimals;
  var q1 = pool.q1 / 10 ** t1.decimals;
  if (p0 == null)
  {
      p0 = q1 * p1 / q0;
      prices[pool.token0] = { usd : p0 };
  }
  if (p1 == null)
  {
      p1 = q0 * p0 / q1;
      prices[pool.token1] = { usd : p1 };
  }
  var tvl = q0 * p0 + q1 * p1;
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  let stakeTokenTicker = `[${t0.symbol}]-[${t1.symbol}]`;
  if (pool.is1inch) stakeTokenTicker += " 1INCH LP";
  else if (pool.symbol.includes("LSLP")) stakeTokenTicker += " LSLP";
  else if (pool.symbol.includes("BLP")) stakeTokenTicker += " BLP";
  else if (pool.symbol.includes("ZDEXLP")) stakeTokenTicker += " ZooDex LP";
  else if (pool.symbol.includes("OperaSwap")) stakeTokenTicker += " Opera Swap LP";
  else if (pool.symbol.includes("SLP")) stakeTokenTicker += " SLP";
  else if (pool.symbol.includes("Cake")) stakeTokenTicker += " Cake LP";
  else if (pool.name.includes("Value LP")) stakeTokenTicker += " Value LP";
  else if (pool.symbol.includes("PGL")) stakeTokenTicker += " PGL";
  else if (pool.symbol.includes("CS-LP")) stakeTokenTicker += " CSS LP";
  else if (pool.symbol.includes("DFYN")) stakeTokenTicker += " DFYN LP";
  else if (pool.symbol.includes("SPIRIT")) stakeTokenTicker += " SPIRIT LP";
  else if (pool.symbol.includes("spLP")) stakeTokenTicker += " SPOOKY LP";
  else if (pool.symbol.includes("Lv1")) stakeTokenTicker += " STEAK LP";
  else if (pool.symbol.includes("PLP")) stakeTokenTicker += " Pure Swap LP";
  else if (pool.symbol.includes("Field-LP")) stakeTokenTicker += " Yield Fields LP";
  else if (pool.symbol.includes("UPT")) stakeTokenTicker += " Unic Swap LP";
  else if (pool.symbol.includes("ELP")) stakeTokenTicker += " ELK LP";
  else if (pool.symbol.includes("BenSwap")) stakeTokenTicker += " BenSwap LP";
  else if (pool.symbol.includes("BRUSH-LP")) stakeTokenTicker += " BRUSH LP";
  else if (pool.symbol.includes("APE-LP")) stakeTokenTicker += " APE LP";
  else if (pool.symbol.includes("Galaxy-LP")) stakeTokenTicker += " Galaxy LP";
  else if (pool.symbol.includes("KUS-LP")) stakeTokenTicker += " KUS LP";
  else if (pool.symbol.includes("KoffeeMug")) stakeTokenTicker += " KoffeeMug";
  else if (pool.symbol.includes("DMM-LP")) stakeTokenTicker += " Kyber LP";
  else if (pool.symbol.includes("CAT-LP")) stakeTokenTicker += " PolyCat LP";
  else if (pool.symbol.includes("VLP")) stakeTokenTicker += " AURO LP";
  else if (pool.symbol.includes("ULP")) stakeTokenTicker += " Ubeswap LP Token";
  else stakeTokenTicker += " Uni LP";
  return {
      t0: t0,
      p0: p0,
      q0  : q0,
      t1: t1,
      p1: p1,
      q1  : q1,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakeTokenTicker : stakeTokenTicker,
      print_price(chain="eth", decimals, customURLs) {
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        if (customURLs) {
          const poolUrl = `${customURLs.info}/${pool.address}`
          const helperUrls = [
            `${customURLs.add}/${t0address}/${t1address}`,
            `${customURLs.remove}/${t0address}/${t1address}`,
            `${customURLs.swap}?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]
          const helperHrefs = helperUrls.length == 0 ? "" :
            ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
          _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
          _print(`${t0.symbol} Price: $${displayPrice(p0)}`);
          _print(`${t1.symbol} Price: $${displayPrice(p1)}`);
          _print(`Staked: ${pool.staked.toFixed(decimals ?? 4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);

        }
        else {
          const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
          pool.symbol.includes("LSLP") ? `https://info.linkswap.app/pair/${pool.address}` :
            pool.symbol.includes("SLP") ? (
              {
                "eth": `http://analytics.sushi.com/pairs/${pool.address}`,
                "arbitrum": `http://analytics.sushi.com/pairs/${pool.address}`, //temporary solution until they put arbitrum
                "bsc": `http://analytics-ftm.sushi.com/pairs/${pool.address}`,
                "fantom": `http://analytics-ftm.sushi.com/pairs/${pool.address}`,
                "matic": `http://analytics-polygon.sushi.com/pairs/${pool.address}`,
                "xdai": `https://analytics-xdai.sushi.com/pairs/${pool.address}`
              }[chain]) :
              pool.symbol.includes("Cake") ?  `https://pancakeswap.info/pair/${pool.address}` :
              pool.symbol.includes("CAT-LP") ?  `https://polycat.finance` :
              pool.symbol.includes("PGL") ?  `https://info.pangolin.exchange/#/pair/${pool.address}` :
              pool.symbol.includes("CS-LP") ?  `https://app.coinswap.space/#/` :
              pool.name.includes("Value LP") ?  `https://info.vswap.fi/pool/${pool.address}` :
              pool.name.includes("Ubeswap") ?  `https://info.ubeswap.org/pair/${pool.address}` :
              pool.name.includes("OperaSwap") ?  `https://www.operaswap.finance/` :
              pool.symbol.includes("SPIRIT") ?  `https://swap.spiritswap.finance/#/swap` :
              pool.symbol.includes("spLP") ?  `https://info.spookyswap.finance/pair/${pool.address}` :
              pool.symbol.includes("Lv1") ?  `https://info.steakhouse.finance/pair/${pool.address}` :
              pool.symbol.includes("ELP") ?  `https://app.elk.finance/#/swap` :
              pool.symbol.includes("BRUSH-LP") ?  `https://paintswap.finance` :
              pool.symbol.includes("PLP") ?  `https://exchange.pureswap.finance/#/swap` :
              pool.symbol.includes("BLP") ?  `https://info.bakeryswap.org/#/pair/${pool.address}` :
              pool.symbol.includes("KUS-LP") ?  `https://kuswap.info/pair/#/${pool.address}` :
              pool.symbol.includes("KoffeeMug") ?  `https://koffeeswap.exchange/#/pro` :
              pool.symbol.includes("APE-LP") ?  `https://info.apeswap.finance/pair/${pool.address}` :
              pool.symbol.includes("VLP") ?  `https://info.viralata.finance/pair/${pool.address}` :
              pool.symbol.includes("ZDEXLP") ?  `https://charts.zoocoin.cash/?exchange=ZooDex&pair=${t0.symbol}-${t1.symbol}` :
              pool.symbol.includes("Field-LP") ?  `https://exchange.yieldfields.finance/#/swap` :
              pool.symbol.includes("UPT") ?  `https://www.app.unic.ly/#/discover` :
              pool.symbol.includes("BenSwap") ? ({
                "bsc": `https://info.benswap.finance/pair/${pool.address}`
              }[chain]) :
              pool.symbol.includes("Galaxy-LP") ? (
                {
                    "bsc": `https://bsc-exchange.galaxyfinance.one/#/swap`,
                    "heco": `https://heco-exchange.galaxyfinance.one/#/swap`,
                    "matic": `https://polygon-exchange.galaxyfinance.one/#/swap`,
                    "fantom": `https://fantom-exchange.galaxyfinance.one/#/swap`,
                }[chain]) :
              chain == "matic" ? `https://info.quickswap.exchange/pair/${pool.address}` :
            `http://uniswap.info/pair/${pool.address}`;
          const helperUrls = pool.is1inch ? [] :
          pool.symbol.includes("LSLP") ? [
            `https://linkswap.app/#/add/${t0address}/${t1address}`,
            `https://linkswap.app/#/remove/${t0address}/${t1address}`,
            `https://linkswap.app/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("BLP") ? [
            `https://www.bakeryswap.org/#/add/${t0address}/${t1address}`,
            `https://www.bakeryswap.org/#/remove/${t0address}/${t1address}`,
            `https://www.bakeryswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("CAT-LP") ? [
            `https://trade.polycat.finance/#/add/${t0address}/${t1address}`,
            `https://trade.polycat.finance/#/remove/${t0address}/${t1address}`,
            `https://trade.polycat.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("APE-LP") ? [
            `https://app.apeswap.finance/add/${t0address}/${t1address}`,
            `https://app.apeswap.finance/remove/${t0address}/${t1address}`,
            `https://app.apeswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("ULP") ? [
            `https://app.ubeswap.org/#/add/${t0address}/${t1address}`,
            `https://app.ubeswap.org/#/remove/${t0address}/${t1address}`,
            `https://app.ubeswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("VLP") ? [
            `https://app.viralata.finance/add/${t0address}/${t1address}`,
            `https://app.viralata.finance/remove/${t0address}/${t1address}`,
            `https://app.viralata.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("ZDEXLP") ? [
            `https://dex.zoocoin.cash/pool/add?inputCurrency=${t0address}&outputCurrency=${t1address}`,
            `https://dex.zoocoin.cash/pool/remove?inputCurrency=${t0address}&outputCurrency=${t1address}`,
            `https://dex.zoocoin.cash/orders/market?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Cake") ? [
            `https://pancakeswap.finance/add/${t0address}/${t1address}`,
            `https://pancakeswap.finance/remove/${t0address}/${t1address}`,
            `https://pancakeswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Lv1") ? [ // adding before matic
            `https://swap.steakhouse.finance/#/add/${t0address}/${t1address}`,
            `https://swap.steakhouse.finance/#/remove/${t0address}/${t1address}`,
            `https://swap.steakhouse.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.name.includes("Value LP") ? [
            `https://bsc.valuedefi.io/#/add/${t0address}/${t1address}`,
            `https://bsc.valuedefi.io/#/remove/${t0address}/${t1address}`,
            `https://bsc.valuedefi.io/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("PGL") ? [
            `https://app.pangolin.exchange/#/add/${t0address}/${t1address}`,
            `https://app.pangolin.exchange/#/remove/${t0address}/${t1address}`,
            `https://app.pangolin.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("OperaSwap") ? [
            `https://exchange.operaswap.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.operaswap.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.operaswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("ELP") ? [
            `https://app.elk.finance/#/add/${t0address}/${t1address}`,
            `hhttps://app.elk.finance/#/remove/${t0address}/${t1address}`,
            `https://app.elk.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("CS-LP") ? [
            `https://app.coinswap.space/#/add/${t0address}/${t1address}`,
            `https://app.coinswap.space/#/remove/${t0address}/${t1address}`,
            `https://app.coinswap.space/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("SLP") ? [
            `https://app.sushi.com/add/${t0address}/${t1address}`,
            `https://app.sushi.com/remove/${t0address}/${t1address}`,
            `https://app.sushi.com/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("SPIRIT") ? [
            `https://swap.spiritswap.finance/add/${t0address}/${t1address}`,
            `https://swap.spiritswap.finance/remove/${t0address}/${t1address}`,
            `https://swap.spiritswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("spLP") ? [
            `https://spookyswap.finance/add/${t0address}/${t1address}`,
            `https://spookyswap.finance/remove/${t0address}/${t1address}`,
            `https://spookyswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("PLP") ? [
            `https://exchange.pureswap.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.pureswap.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.pureswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Field-LP") ? [
            `https://exchange.yieldfields.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.yieldfields.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.yieldfields.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("UPT") ? [
            `https://www.app.unic.ly/#/add/${t0address}/${t1address}`,
            `https://www.app.unic.ly/#/remove/${t0address}/${t1address}`,
            `https://www.app.unic.ly/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("BRUSH-LP") ? [
            `https://exchange.paintswap.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.paintswap.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.paintswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("BenSwap") ? ({
            "bsc": [
              `https://dex.benswap.finance/#/add/${t0address}/${t1address}`,
              `https://dex.benswap.finance/#/remove/${t0address}/${t1address}`,
              `https://dex.benswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ]
          }[chain]) :
          pool.symbol.includes("Galaxy-LP") ? ({
            "bsc": [
              `https://bsc-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://bsc-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://bsc-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ],
            "heco": [
              `https://heco-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://heco-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://heco-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ],
            "polygon": [
              `https://polygon-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://polygon-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://polygon-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ],
            "fantom": [
              `https://fantom-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://fantom-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://fantom-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ]
          }[chain]) :
          chain=='matic'? [
            `https://quickswap.exchange/#/add/${t0address}/${t1address}`,
            `https://quickswap.exchange/#/remove/${t0address}/${t1address}`,
            `https://quickswap.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("KUS-LP") ? [
              `https://kuswap.finance/#/add/${t0address}/${t1address}`,
              `https://kuswap.finance/#/remove/${t0address}/${t1address}`,
              `https://kuswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("KoffeeMug") ? [
            `https://koffeeswap.exchange/#/add/${t0address}/${t1address}`,
            `https://koffeeswap.exchange/#/remove/${t0address}/${t1address}`,
            `https://koffeeswap.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
        ] :
          t0.symbol.includes("COMFI") ? [
            `https://app.uniswap.org/#/add/v2/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/remove/v2/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          [ `https://app.uniswap.org/#/add/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/remove/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` ]

          const helperHrefs = helperUrls.length == 0 ? "" :
            ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
          _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
          _print(`${t0.symbol} Price: $${displayPrice(p0)}`);
          _print(`${t1.symbol} Price: $${displayPrice(p1)}`);
          _print(`Staked: ${pool.staked.toFixed(decimals ?? 4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
        }
      },
      pair_links(chain="eth", decimals, customURLs) {
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        if (customURLs) {
          const poolUrl = `${customURLs.info}/${pool.address}`
          const helperUrls = [
            `${customURLs.add}/${t0address}/${t1address}`,
            `${customURLs.remove}/${t0address}/${t1address}`,
            `${customURLs.swap}?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]
          return {
            pair_link: `<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>`,
            add_liquidity_link: `<a href='${helperUrls[0]}' target='_blank'>[+]</a>`,
            remove_liquidity_link: `<a href='${helperUrls[1]}' target='_blank'>[-]</a>`,
            swap_link: `<a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`,
            token0: t0.symbol,
            price0: `$${displayPrice(p0)}`,
            token1: t1.symbol,
            price1: `$${displayPrice(p1)}`,
            total_staked: `${pool.staked.toFixed(4)}`,
            total_staked_dollars: `$${formatMoney(staked_tvl)}`,
            tvl: `$${formatMoney(tvl)}`
          }
        }
        else {
          const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
            pool.symbol.includes("LSLP") ? `https://info.linkswap.app/pair/${pool.address}` :
              pool.symbol.includes("SLP") ?  `http://analytics.sushi.com/pairs/${pool.address}` :
                pool.symbol.includes("Cake") ?  `https://pancakeswap.info/pair/${pool.address}` :
                  pool.symbol.includes("PGL") ?  `https://info.pangolin.exchange/#/pair/${pool.address}` :
                    pool.symbol.includes("CS-LP") ?  `https://app.coinswap.space/#/` :
                      pool.name.includes("Value LP") ?  `https://info.vswap.fi/pool/${pool.address}` :
                        pool.name.includes("BLP") ?  `https://info.bakeryswap.org/#/pair/${pool.address}` :
                          pool.symbol.includes("BenSwap") ? ({
                            "bsc": `https://info.benswap.finance/pair/${pool.address}`
                          }[chain]) :
                          pool.symbol.includes("Galaxy-LP") ? ({
                            "bsc": `https://bsc-exchange.galaxyfinance.one/#/swap`,
                            "heco": `https://heco-exchange.galaxyfinance.one/#/swap`,
                            "polygon": `https://polygon-exchange.galaxyfinance.one/#/swap`,
                            "fantom": `https://fantom-exchange.galaxyfinance.one/#/swap`
                          }[chain]) :
                            chain == "matic" ? `https://info.quickswap.exchange/pair/${pool.address}` :
                              `http://uniswap.info/pair/${pool.address}`;
          const helperUrls = pool.is1inch ? [] :
            pool.symbol.includes("LSLP") ? [
                `https://linkswap.app/#/add/${t0address}/${t1address}`,
                `https://linkswap.app/#/remove/${t0address}/${t1address}`,
                `https://linkswap.app/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
              ] :
              pool.symbol.includes("Cake") ? [
                  `https://pancakeswap.finance/add/${t0address}/${t1address}`,
                  `https://pancakeswap.finance/remove/${t0address}/${t1address}`,
                  `https://pancakeswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                ] :
                chain=='matic'? [
                    `https://quickswap.exchange/#/add/${t0address}/${t1address}`,
                    `https://quickswap.exchange/#/remove/${t0address}/${t1address}`,
                    `https://quickswap.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                  ] :
                  pool.name.includes("Value LP") ? [
                      `https://bsc.valuedefi.io/#/add/${t0address}/${t1address}`,
                      `https://bsc.valuedefi.io/#/remove/${t0address}/${t1address}`,
                      `https://bsc.valuedefi.io/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                    ] :
                    pool.symbol.includes("PGL") ? [
                        `https://app.pangolin.exchange/#/add/${t0address}/${t1address}`,
                        `https://app.pangolin.exchange/#/remove/${t0address}/${t1address}`,
                        `https://app.pangolin.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                      ] :
                      pool.symbol.includes("CS-LP") ? [
                          `https://app.coinswap.space/#/add/${t0address}/${t1address}`,
                          `https://app.coinswap.space/#/remove/${t0address}/${t1address}`,
                          `https://app.coinswap.space/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                        ] :
                        pool.symbol.includes("SLP") ? [
                            `https://app.sushi.com/add/${t0address}/${t1address}`,
                            `https://app.sushi.com/remove/${t0address}/${t1address}`,
                            `https://app.sushi.com/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                          ] :
                          pool.symbol.includes("BenSwap") ? ({
                            "bsc": [
                              `https://dex.benswap.finance/#/add/${t0address}/${t1address}`,
                              `https://dex.benswap.finance/#/remove/${t0address}/${t1address}`,
                              `https://dex.benswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ]
                          }[chain]) :
                        pool.symbol.includes("Galaxy-LP") ? ({
                            "bsc": [
                            `https://bsc-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://bsc-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://bsc-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ],
                            "heco": [
                            `https://heco-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://heco-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://heco-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ],
                            "polygon": [
                            `https://polygon-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://polygon-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://polygon-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ],
                            "fantom": [
                            `https://fantom-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://fantom-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://fantom-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ]
                        }[chain]) :
                            t0.symbol.includes("COMFI") ? [
                                `https://app.uniswap.org/#/add/v2/${t0address}/${t1address}`,
                                `https://app.uniswap.org/#/remove/v2/${t0address}/${t1address}`,
                                `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                              ] :
                              [ `https://app.uniswap.org/#/add/${t0address}/${t1address}`,
                                `https://app.uniswap.org/#/remove/${t0address}/${t1address}`,
                                `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}` ]

          return {
            pair_link: `<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>`,
            add_liquidity_link: `<a href='${helperUrls[0]}' target='_blank'>[+]</a>`,
            remove_liquidity_link: `<a href='${helperUrls[1]}' target='_blank'>[-]</a>`,
            swap_link: `<a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`,
            token0: t0.symbol,
            price0: `$${displayPrice(p0)}`,
            token1: t1.symbol,
            price1: `$${displayPrice(p1)}`,
            total_staked: `${pool.staked.toFixed(4)}`,
            total_staked_dollars: `$${formatMoney(staked_tvl)}`,
            tvl: `$${formatMoney(tvl)}`
          }

        }
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${t0.symbol} + ${q1user.toFixed(4)} ${t1.symbol}`);
      }
  }
}

export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}

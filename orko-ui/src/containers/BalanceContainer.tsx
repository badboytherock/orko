/*
 * Orko
 * Copyright © 2018-2019 Graham Crockford
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React, { useContext } from "react"
import { connect } from "react-redux"
import Balance from "../components/Balance"
import Section from "../components/primitives/Section"
import AuthenticatedOnly from "./AuthenticatedOnly"
import WithCoin from "./WithCoin"
import { SocketContext } from "@orko-ui-socket/index"
import { Coin } from "@orko-ui-market/index"
import { getSelectedCoin } from "selectors/coins"

const BalanceContainer: React.FC<{ coin: Coin }> = ({ coin }) => {
  const socketApi = useContext(SocketContext)
  const ticker = socketApi.selectedCoinTicker
  const balances = socketApi.balances
  return (
    <Section id="balance" heading="Balances">
      <AuthenticatedOnly>
        <WithCoin>
          {coin => <Balance coin={coin} balance={balances} ticker={ticker} onClickNumber={undefined} />}
        </WithCoin>
      </AuthenticatedOnly>
    </Section>
  )
}

export default connect(state => {
  return {
    coin: getSelectedCoin(state)
  }
})(BalanceContainer)
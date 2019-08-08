import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import { animated, useSpring } from 'react-spring'

import Emoji from '../components/Emoji'
import Link from '../components/Link'
import { useMeasure, useBodyKeyDown } from '../hooks'

const Intro = styled.div``

const H2 = styled.h2`
  margin-top: 0;
`

const LinkWrapper = styled.div``

const Links = styled.div`
  display: flex;

  margin-top: -1rem;
  margin-right: -1rem;
  ${LinkWrapper} {
    margin-top: 1rem;
    margin-right: 1rem;
  }
`

const CopyEmoji = styled(Emoji)`
  line-height: 1rem;
  margin: 0.5rem;
  cursor: pointer;
`

const BioWrapper = styled.div`
  margin-top: 4rem;
  width: 100%;
`

const LengthSelectorWrapper = styled.div``

const LengthSelectors = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  margin-top: -1rem;
  margin-right: -2rem;
  ${LengthSelectorWrapper} {
    margin-top: 1rem;
    margin-right: 2em;
  }
`

const BioEmoji = styled(Emoji)`
  height: auto;
  text-underline-position: under;
  text-decoration: ${({ selected }) => selected && 'underline'};

  :hover {
    text-decoration: underline;
  }
`

const DescriptionWrapper = styled(animated.div)``

const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const P = styled.p`
  max-width: 50rem;
  word-wrap: break-word;
  margin: 1rem 2rem 1rem 2rem;
`

function Bio() {
  const router = useRouter()
  const [selected, setSelected] = useState(router.query.description === 'long' ? 1 : 0)
  useEffect(() => {
    if (router.query.description === 'long') {
      setSelected(1)
    } else {
      setSelected(0)
    }
  }, [router.query.description])

  function select(newSelected) {
    if (newSelected !== selected) {
      setSelected(newSelected)
    }
  }

  const [bind, { height: viewHeight }, observedInitial] = useMeasure()
  const { height } = useSpring({
    from: { height: observedInitial ? viewHeight : 'auto' },
    to: { height: observedInitial ? viewHeight : 'auto' }
  })

  useBodyKeyDown('ArrowRight', () => {
    select(1)
  })

  useBodyKeyDown('ArrowLeft', () => {
    select(0)
  })

  return (
    <BioWrapper>
      <LengthSelectors>
        <LengthSelectorWrapper>
          <BioEmoji
            label="short"
            onClick={() => {
              router.push('/')
              select(0)
            }}
            selected={selected === 0}
          >
            ⬇️
          </BioEmoji>
        </LengthSelectorWrapper>
        <LengthSelectorWrapper>
          <BioEmoji
            label="long"
            onClick={() => {
              router.push('/?description=long')
              select(1)
            }}
            selected={selected === 1}
          >
            ⬇️⬇️
          </BioEmoji>
        </LengthSelectorWrapper>
      </LengthSelectors>
      <DescriptionWrapper style={{ height: observedInitial ? height : 'auto' }}>
        <Description {...bind}>
          {selected === 0 ? (
            <P>
              I graduated from <span style={{ color: '#B9D9EB' }}>Columbia</span> in 2016, where I studied economics and
              math. After a close call with an econ PhD I became fascinated with cryptocurrencies, and have since gone
              fully down the rabbit hole. Right now I'm a Senior Engineer at{' '}
              <Link color="#DC6BE5" href="https://uniswap.io/">
                Uniswap
              </Link>
              , a decentralized exchange built on Ethereum.
            </P>
          ) : (
            <P>
              I have a B.A. in Economics-Mathematics from <span style={{ color: '#B9D9EB' }}>Columbia University</span>.
              After graduating I spent nearly two years at the Federal Reserve Bank of New York working as a Senior
              Research Analyst in the Money and Payments Studies division. My long-standing interest in cryptocurrencies
              eventually led me to an engineering role at Hydrogen, where I wrote security grade smart contracts,
              co-authored <Link href="https://erc1484.org/">ERC-1484</Link> (a digital identity protocol), and developed
              open-source blockchain tooling. I'm now a Senior Engineer at{' '}
              <Link color="#DC6BE5" href="https://uniswap.io/">
                Uniswap
              </Link>
              , a decentralized exchange protocol for trading Ethereum-based assets.
            </P>
          )}
        </Description>
      </DescriptionWrapper>
    </BioWrapper>
  )
}

export default function Main() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    copy('noahwz@gmail.com')
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const reset = setTimeout(() => {
        setCopied(false)
      }, 500)

      return () => {
        clearTimeout(reset)
      }
    }
  }, [copied])

  useBodyKeyDown('c', copyEmail)

  return (
    <>
      <Intro>
        <H2>
          <Emoji label="wave">👋🏻</Emoji> I'm Noah!
        </H2>
      </Intro>
      <Links>
        <LinkWrapper>
          <Link href="https://github.com/NoahZinsmeister">GitHub</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="https://twitter.com/NoahZinsmeister">Twitter</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link href="mailto:noahwz@gmail.com">Email</Link>
          <CopyEmoji label={copied ? 'copied' : 'copy'} onClick={copied ? false : copyEmail}>
            {copied ? '👍🏻' : '📋'}
          </CopyEmoji>
        </LinkWrapper>
      </Links>
      <Bio />
    </>
  )
}

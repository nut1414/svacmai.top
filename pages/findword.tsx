import Head from 'next/head'
import {
  Fragment,
  FC,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
} from 'react'
import words from '../data/wordle/words.json'
import { WordFormType, MatchWord } from 'types'
import { RiLoader4Fill } from 'react-icons/ri'
import { HiOutlineInformationCircle } from 'react-icons/hi'

const FindWord: FC = () => {
  const [matchWord, setMatchWord] = useState<MatchWord>({ wordleWord: [] })
  const [loading, setLoading] = useState(false)

  const [word, setWord] = useState<WordFormType>({
    hasLetter: [],
    noLetter: [],
    letter1: '',
    letter2: '',
    letter3: '',
    letter4: '',
    letter5: '',
  })

  //
  const checkNoLetter = (e: ChangeEvent<HTMLInputElement>) => {
    let repeteLetter: boolean = false
    const noLetter = word.noLetter
    noLetter.forEach((letter) => {
      if (letter === e.target.value[e.target.value.length - 1]) {
        // delete last letter from noLetter
        repeteLetter = true
      }
    })
    return repeteLetter
  }

  const checkHasLetter = (e: ChangeEvent<HTMLInputElement>) => {
    let repeteLetter: boolean = false
    const hasLetter = word.hasLetter
    hasLetter.forEach((letter) => {
      if (letter === e.target.value[e.target.value.length - 1]) {
        // delete last letter from noLetter
        repeteLetter = true
      }
    })
    return repeteLetter
  }

  const checkLetter = (e: ChangeEvent<HTMLInputElement>) => {
    let repeteLetter: boolean = false

    repeteLetter = checkNoLetter(e) || checkHasLetter(e)

    if (
      word.letter1 === e.target.value[e.target.value.length - 1] ||
      word.letter2 === e.target.value[e.target.value.length - 1] ||
      word.letter3 === e.target.value[e.target.value.length - 1] ||
      word.letter4 === e.target.value[e.target.value.length - 1] ||
      word.letter5 === e.target.value[e.target.value.length - 1]
    ) {
      repeteLetter = true
    }
    if (!repeteLetter) {
      if (e.target.id === 'noLetter') {
        setWord({
          ...word,
          noLetter: e.target.value.toLocaleLowerCase().split(''),
        })
      }
      if (e.target.id === 'hasLetter') {
        setWord({
          ...word,
          hasLetter: e.target.value.toLocaleLowerCase().split(''),
        })
      }
    }
  }

  const checkNoLetterDelete = (e: ChangeEvent<HTMLInputElement>) => {
    if (word.noLetter.length > e.target.value.length) {
      setWord({ ...word, noLetter: e.target.value.split('') })
    }
  }

  const checkHasLetterDelete = (e: ChangeEvent<HTMLInputElement>) => {
    if (word.hasLetter.length > e.target.value.length) {
      setWord({ ...word, hasLetter: e.target.value.split('') })
    }
  }

  const findMatchPlaceLetter = (matchHasLetter: Array<string>) => {
    if (word.letter1 !== '') {
      matchHasLetter = matchHasLetter.filter((w) => word.letter1 === w[0])
    }
    if (word.letter2 !== '') {
      matchHasLetter = matchHasLetter.filter((w) => word.letter2 === w[1])
    }
    if (word.letter3 !== '') {
      matchHasLetter = matchHasLetter.filter((w) => word.letter3 === w[2])
    }
    if (word.letter4 !== '') {
      matchHasLetter = matchHasLetter.filter((w) => word.letter4 === w[3])
    }
    if (word.letter5 !== '') {
      matchHasLetter = matchHasLetter.filter((w) => word.letter5 === w[4])
    }
    return matchHasLetter
  }

  const letterInNoLetter = () => {
    let noWord: Array<string> = word.noLetter

    if (word.letter1 !== '') {
      noWord = noWord.filter((w) => !w.includes(word.letter1))
    }
    if (word.letter2 !== '') {
      noWord = noWord.filter((w) => !w.includes(word.letter2))
    }
    if (word.letter3 !== '') {
      noWord = noWord.filter((w) => !w.includes(word.letter3))
    }
    if (word.letter4 !== '') {
      noWord = noWord.filter((w) => !w.includes(word.letter4))
    }
    if (word.letter5 !== '') {
      noWord = noWord.filter((w) => !w.includes(word.letter5))
    }

    setWord({
      ...word,
      noLetter: noWord,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMatchWord({ wordleWord: [] })
    let matchHasLetter: Array<string> = words

    // NOTE - check if word has letter in right position
    matchHasLetter = findMatchPlaceLetter(matchHasLetter)

    // NOTE - check if letters in the words
    word.hasLetter.forEach((letter) => {
      matchHasLetter = matchHasLetter.filter((w) => w.includes(letter))
    })

    // NOTE - check if letters not in the words
    word.noLetter.forEach((letter) => {
      matchHasLetter = matchHasLetter.filter((w) => !w.includes(letter))
    })

    setMatchWord({ wordleWord: matchHasLetter })
    setLoading(false)
  }

  useEffect(() => {
    letterInNoLetter()
  }, [word.letter1, word.letter2, word.letter3, word.letter4, word.letter5])

  return (
    <Fragment>
      <Head>
        <title>Find Word</title>
      </Head>
      <main className="min-h-screen w-full bg-neutral-900 p-4 px-14 font-MaiLog text-white">
        <h1 className="mb-8 flex w-full items-center justify-center text-2xl gap-2">
          <span>Find Word</span>
          <HiOutlineInformationCircle className="h-full" />
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-4 flex w-fit flex-col gap-4 rounded-md bg-neutral-400 p-4"
        >
          {/* NOTE - noLetter */}
          <div>
            <p className="mb-1 text-neutral-800">
              letters that doen't have in word.
            </p>
            <input
              type="text"
              value={word.noLetter.filter((letter) => letter !== '').join('')}
              onChange={(e) => {
                checkLetter(e)
                checkNoLetterDelete(e)
              }}
              className="focus:shadow-outline w-full  appearance-none rounded bg-neutral-700 py-2 px-3 leading-tight text-neutral-300 shadow focus:outline-none"
            />
          </div>
          {/* NOTE - hasLetter */}
          <div>
            <p className="mb-1 text-neutral-800">letters that have in word.</p>
            <input
              type="text"
              value={word.hasLetter.filter((letter) => letter !== '').join('')}
              onChange={(e) => {
                checkLetter(e)
                checkHasLetterDelete(e)
              }}
              className="focus:shadow-outline w-full  appearance-none rounded bg-neutral-700 py-2 px-3 leading-tight text-neutral-300 shadow focus:outline-none"
            />
          </div>
          {/* NOTE - input text */}
          <div className="flex flex-row justify-between gap-2">
            {/* letter1 */}
            <input
              type="text"
              maxLength={1}
              value={word.letter1}
              onChange={(e) =>
                setWord({
                  ...word,
                  letter1: e.target.value.toLocaleLowerCase(),
                })
              }
              className="focus:shadow-outline w-11 appearance-none rounded bg-neutral-700 py-2 px-3 text-xl leading-tight text-neutral-300 shadow focus:outline-none"
            />
            {/* letter2 */}
            <input
              type="text"
              maxLength={1}
              value={word.letter2}
              onChange={(e) =>
                setWord({
                  ...word,
                  letter2: e.target.value.toLocaleLowerCase(),
                })
              }
              className="focus:shadow-outline w-11 appearance-none rounded bg-neutral-700 py-2 px-3 text-xl leading-tight text-neutral-300 shadow focus:outline-none"
            />
            {/* letter3 */}
            <input
              type="text"
              maxLength={1}
              value={word.letter3}
              onChange={(e) =>
                setWord({
                  ...word,
                  letter3: e.target.value.toLocaleLowerCase(),
                })
              }
              className="focus:shadow-outline w-11 appearance-none rounded bg-neutral-700 py-2 px-3 text-xl leading-tight text-neutral-300 shadow focus:outline-none"
            />
            {/* letter4 */}
            <input
              type="text"
              maxLength={1}
              value={word.letter4}
              onChange={(e) =>
                setWord({
                  ...word,
                  letter4: e.target.value.toLocaleLowerCase(),
                })
              }
              className="focus:shadow-outline w-11 appearance-none rounded bg-neutral-700 py-2 px-3 text-xl leading-tight text-neutral-300 shadow focus:outline-none"
            />
            {/* letter5 */}
            <input
              type="text"
              maxLength={1}
              value={word.letter5}
              onChange={(e) =>
                setWord({
                  ...word,
                  letter5: e.target.value.toLocaleLowerCase(),
                })
              }
              className="focus:shadow-outline w-11 appearance-none rounded bg-neutral-700 py-2 px-3 text-xl leading-tight text-neutral-300 shadow focus:outline-none"
            />
          </div>
          {/* NOTE - submit button */}
          <input
            type="submit"
            value="Check"
            className="rounded-md bg-neutral-500  p-1 px-2 text-lg text-neutral-900 transition duration-150 ease-in-out hover:bg-neutral-700 hover:text-neutral-400"
          />
        </form>
        {/* NOTE - loading */}
        {loading ? (
          <div className="flex items-center justify-center">
            <RiLoader4Fill className="h-1/5 w-1/5 animate-spin fill-neutral-700" />
          </div>
        ) : (
          ''
        )}
        {/* NOTE - show word match */}
        <div className="flex flex-wrap justify-between justify-items-stretch gap-2">
          {matchWord.wordleWord.map((w) => (
            <div
              key={w}
              className="flex cursor-default items-center justify-center rounded-md bg-neutral-400 px-2 py-1 text-neutral-700 transition duration-100 ease-in-out hover:bg-neutral-900 hover:text-neutral-300"
            >
              {w}
            </div>
          ))}
        </div>
      </main>
    </Fragment>
  )
}

export default FindWord

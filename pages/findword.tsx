import Head from 'next/head'
import {
  Fragment,
  FC,
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  SetStateAction,
} from 'react'
import words from '../data/wordle/words.json'
import { WordFormType, MatchWord } from 'types'
import {
  RiLoader4Fill,
  RiDeleteBin2Fill,
  RiDeleteBack2Fill,
} from 'react-icons/ri'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import FindWordModal from '@components/model/findword'

const FindWord: FC = () => {
  const [matchWord, setMatchWord] = useState<MatchWord>({ wordleWord: [] })
  const [loading, setLoading] = useState(false)
  const [wordDefinition, setWordDefinition] = useState<string>()
  const [modal, setModal] = useState(false)

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

  const deletePerfectInput = () => {
    const emptyWord: string = ''

    setWord({
      ...word,
      letter1: emptyWord,
      letter2: emptyWord,
      letter3: emptyWord,
      letter4: emptyWord,
      letter5: emptyWord,
    })
  }

  const deleteNoLetter = () => {
    setWord({
      ...word,
      noLetter: [],
    })
  }

  const deleteHasLetter = () => {
    setWord({
      ...word,
      hasLetter: [],
    })
  }

  useEffect(() => {
    letterInNoLetter()
  }, [word.letter1, word.letter2, word.letter3, word.letter4, word.letter5])

  function disableScrolling() {
    var x = window.scrollX
    var y = window.scrollY
    window.onscroll = function () {
      window.scrollTo(x, y)
    }
  }

  function enableScrolling() {
    window.onscroll = function () {}
  }

  const checkScrollAble = () => {
    if (modal) {
      disableScrolling()
    } else {
      enableScrolling()
    }
  }

  useEffect(() => {
    checkScrollAble()
  }, [modal])

  return (
    <Fragment>
      <Head>
        <title>Find Word</title>
        <meta
          name="description"
          content="Find Word is a game helper that lets you look for words in a wordle."
        />
      </Head>
      <main className="relative flex min-h-screen w-full min-w-full flex-col items-center justify-center bg-neutral-900 p-4 px-0 font-MaiLog text-white sm:px-14">
        {modal ? (
          <FindWordModal word={wordDefinition as string} setModal={setModal} />
        ) : null}
        <h1 className="mb-8 flex w-full items-center justify-center gap-2 text-2xl">
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
              Letters that don't exist in the word.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={word.noLetter.filter((letter) => letter !== '').join('')}
                id="noLetter"
                onChange={(e) => {
                  checkLetter(e)
                  checkNoLetterDelete(e)
                }}
                className="focus:shadow-outline w-full  appearance-none rounded bg-neutral-700 py-2 px-3 leading-tight text-neutral-300 shadow focus:outline-none"
              />
              <div
                onClick={deleteNoLetter}
                className="flex w-11 appearance-none items-center rounded bg-neutral-700 py-2 px-3 text-xl text-neutral-300 shadow transition duration-300 ease-in-out hover:bg-neutral-300 hover:text-neutral-800"
              >
                <RiDeleteBack2Fill />
              </div>
            </div>
          </div>
          {/* NOTE - hasLetter */}
          <div>
            <p className="mb-1 text-neutral-800">Letters found in a word.</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={word.hasLetter
                  .filter((letter) => letter !== '')
                  .join('')}
                id="hasLetter"
                onChange={(e) => {
                  checkLetter(e)
                  checkHasLetterDelete(e)
                }}
                className="focus:shadow-outline w-full  appearance-none rounded bg-neutral-700 py-2 px-3 leading-tight text-neutral-300 shadow focus:outline-none"
              />
              <div
                onClick={deleteHasLetter}
                className="flex w-11 appearance-none items-center rounded bg-neutral-700 py-2 px-3 text-xl text-neutral-300 shadow transition duration-300 ease-in-out hover:bg-neutral-300 hover:text-neutral-800"
              >
                <RiDeleteBack2Fill />
              </div>
            </div>
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
            <div
              onClick={deletePerfectInput}
              className="flex w-11 appearance-none items-center rounded bg-neutral-700 py-2 px-3 text-xl text-neutral-300 shadow transition duration-300 ease-in-out hover:bg-neutral-300 hover:text-neutral-800"
            >
              <RiDeleteBin2Fill />
            </div>
          </div>
          {/* NOTE - submit button */}
          <input
            type="submit"
            value="Check"
            className="rounded-md bg-neutral-600  p-1 px-2 text-lg text-neutral-300 transition duration-150 ease-in-out hover:bg-neutral-700 hover:text-neutral-200"
          />
        </form>
        <button onClick={() => setModal(true)}>test</button>
        {/* NOTE - loading */}
        {loading ? (
          <div className="flex items-center justify-center">
            <RiLoader4Fill className="h-1/5 w-1/5 animate-spin fill-neutral-700" />
          </div>
        ) : null}
        {/* NOTE - number of results */}
        {matchWord.wordleWord.length !== 0 ? (
          <p className="pb-3">found {matchWord.wordleWord.length} words</p>
        ) : (
          <></>
        )}
        {/* NOTE - show word match */}
        <div className="flex h-96 flex-wrap justify-center gap-2 overflow-y-auto">
          {matchWord.wordleWord.map((w) => (
            <button
              key={w}
              className="flex h-fit w-20 cursor-default flex-wrap items-center justify-center rounded-md bg-neutral-400 px-2 py-1 text-neutral-700 transition duration-100 ease-in-out hover:bg-neutral-900 hover:text-neutral-300"
              type="button"
              onClick={() => {
                setWordDefinition(w)
                setModal(true)
              }}
            >
              {w}
            </button>
          ))}
        </div>
      </main>
    </Fragment>
  )
}

export default FindWord

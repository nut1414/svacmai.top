import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RiLoader4Fill } from 'react-icons/ri'
import { EnglishDefinitionAPI } from 'types'
import axios from 'axios'
import { GoPlay } from 'react-icons/go'
import { CgClose } from 'react-icons/cg'

const FindWordModal = ({
  word,
  setModal,
}: {
  word: string
  setModal: Dispatch<SetStateAction<boolean>>
}) => {
  const [enMeaning, setEnMeaning] = useState<Array<EnglishDefinitionAPI>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => {
        setEnMeaning(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const showEngMeaning = (engWord: EnglishDefinitionAPI[]) => {
    return (
      <div className="flex flex-col scrollbar-hide">
        {engWord.map((words, index) => (
          <div className="" key={index}>
            <p className="flex items-baseline gap-2">
              <span className="text-lg">Phonetic:</span> {words.phonetic}
              {words.phonetics[0].audio && (
                <GoPlay
                  className="cursor-pointer text-neutral-100 hover:text-neutral-400"
                  onClick={() => {
                    const audio = new Audio(words.phonetics[0].audio)
                    audio.play()
                  }}
                />
              )}
            </p>
            {words.meanings.map((meaning, indexOfMeaning) => (
              <ol key={indexOfMeaning} className="mb-4 list-inside list-disc">
                <p className="flex items-baseline gap-2">
                  <span className="text-lg">Part of speech:</span>
                  {meaning.partOfSpeech}
                </p>
                <p>
                  <span className="text-lg">Definition : </span>
                </p>
                {meaning.definitions?.map((def, indexOfMeaningDefinitions) => (
                  <li key={indexOfMeaningDefinitions} className="indent-4">
                    {def.definition}
                  </li>
                ))}
              </ol>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <span
        onClick={() => setModal(false)}
        className="absolute flex h-full w-full cursor-pointer items-center justify-center bg-black opacity-80"
      />
      <div className=" fixed h-96 w-3/4 overflow-auto break-words rounded-lg bg-neutral-800 p-8 shadow-lg scrollbar-hide">
        <div className="flex items-start justify-between">
          <h1 className="mb-4 text-2xl">Definitions of {word}</h1>
          <CgClose
            className="transform text-neutral-100 duration-100 ease-in-out hover:text-neutral-400"
            onClick={() => setModal(false)}
          />
        </div>

        <div className="scrollbar-hide">
          {error && <p>{error}</p>}
          {loading ? (
            <div className="flex items-center justify-center">
              <RiLoader4Fill className="h-1/5 w-1/5 animate-spin fill-neutral-700" />
            </div>
          ) : (
            showEngMeaning(enMeaning)
          )}
        </div>
      </div>
    </>
  )
}

export default FindWordModal

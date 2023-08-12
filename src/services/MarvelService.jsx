// 5d30a92a852796acb720d958dcbd976e

class MarvelServise {
    _apiBase = 'https://gateway.marvel.com:443/v1/public'
    _apiKey = 'apikey=5d30a92a852796acb720d958dcbd976e'
    _limit = 9
    _offset = 290

    getResourse = async (url) => {
        try {
            const response = await fetch(url)
            return await response.json()
        } catch (e) {
            throw new Error(e)
        }
    }

    getAllCharacters = async (offset = this._offset) => {
        const res = await this.getResourse(`${this._apiBase}/characters?limit=${this._limit}&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformRandomChar)
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}/characters/${id}?${this._apiKey}`)
        return this._transformRandomChar(res.data.results[0])
    }

    _transformRandomChar = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
    }
}

export default MarvelServise
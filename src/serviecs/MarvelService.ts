class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=0b40ec569c1a326faeb0bd916c1fba86'

    getResourse = async (url: RequestInfo | URL) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not frtch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id: any) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (character: { id: any; name: any; description: string | any[]; thumbnail: { path: string; extension: string }; urls: { utl: any }[]; comics: { items: any } }) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description ? `${character.description.slice(0, 210)}...` : 'description is not found  ',
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].utl,
            wiki: character.urls[1].utl,
            comics: character.comics.items
        }
    }
}

export default MarvelService
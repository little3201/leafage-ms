import { DefaultBodyType, http, HttpResponse } from 'msw'

let datas = new Array()

for (let i = 0; i < 10; i++) {
    let data = {
        id: '' + i,
        username: 'username' + i,
        firstname: 'firstname_' + i,
        lastname: 'lastname_' + i,
        accountNonLocked: true,
        accountExpiresAt: new Date(),
        credentialsExpiresAt: new Date(),
        lastModifiedDate: new Date()
    }
    datas.push(data)
}

export const usersHandlers = [
    http.get('/api/users', ({ request }) => {
        const url = new URL(request.url)
        const page = url.searchParams.get('page')
        const size = url.searchParams.get('size')
        // Construct a JSON response with the list of all Dictionarys
        // as the response body.
        let data = {
            content: Array.from(datas.slice(Number(page), Number(size)))
        }

        return HttpResponse.json(data)
    }),
    http.post('/api/users', async ({ request }) => {
        // Read the intercepted request body as JSON.
        const newData: DefaultBodyType = await request.json()

        // Push the new Dictionary to the map of all Dictionarys.
        datas.push(newData)

        // Don't forget to declare a semantic "201 Created"
        // response and send back the newly created Dictionary!
        return HttpResponse.json(newData, { status: 201 })
    }),
    http.delete('/api/users/:id', ({ params }) => {
        // All request path params are provided in the "params"
        // argument of the response resolver.
        const { id } = params

        // Let's attempt to grab the Dictionary by its ID.
        const deletedData = datas.filter(item => item.id === id)

        // Respond with a "404 Not Found" response if the given
        // Dictionary ID does not exist.
        if (!deletedData) {
            return new HttpResponse(null, { status: 404 })
        }

        // Delete the Dictionary from the "allDictionarys" map.
        datas.pop()

        // Respond with a "200 OK" response and the deleted Dictionary.
        return HttpResponse.json(deletedData)
    }),
]
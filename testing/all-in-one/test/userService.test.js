const { describe, it, beforeEach, before, after, afterEach } = require('node:test');
const userService = require('../src/userService.js');
const assert = require('node:assert');
const crypto = require('node:crypto');
const sinon = require('sinon');

describe('userService test suit', () => {
    beforeEach(() => {
        const seedData = {
            name: 'Fulano',
            email: 'fulano@ciclano.com',
            status: 'active'
        }

        userService.create(seedData)
    })

    describe('#list', () => {
        const mockDatabase = [
            {
                name: 'Fulano',
                email: 'fulano@ciclano.com',
                status: 'active',
                id: 1
            }
        ]

        it('should return a list of user with uppercase name', async () => {
            const expected = mockDatabase
                .map(({name, ...result}) => (
                    ({ name: name.toUpperCase(), ...result }
                )))

            const result = userService.list()
            assert.deepStrictEqual(result, expected)
        })
    })

    // describe('#create', () => {
    //     let _userService
    //     let _dependencies
    //     let _sandbox

    //     const mockCreateResult = {
    //         text: 'I must meet Chaves da Silva',
    //         when: new Date('2020-12-01 12:00:00 GMT-0'),
    //         status: 'late',
    //         id: '593e284b-a324-41d0-bf5e-1d751a048bab'
    //       }

    //     const DEFAULT_ID = mockCreateResult.id
    //     before(() => {
    //         // É feito esse ajuste do crypto para não depender do ambiente
    //         crypto.randomUUID = () => DEFAULT_ID
    //         _sandbox = sinon.createSandbox()
    //     })
    //     after(async () => {
    //         crypto.randomUUID = (await import('node:crypto')).randomUUID // manual reset
    //     })
    //     afterEach(() => _sandbox.restore())
    //     beforeEach((context) => {
    //         _dependencies = {
    //             userRepository: {
    //                 create: context.mock.fn(async () => mockCreateResult)
    //             }
    //         }
    //         _userService = new TodoService(_dependencies)
    //     })

    //     it(`shouldn't save todo item with invalid date`, async () => {
    //         const input = new Todo({
    //             text: '',
    //             when: '',
    //         })

    //         const expected = {
    //             error: {
    //                 message: 'invalid data',
    //                 data: {
    //                     text: '',
    //                     when: '',
    //                     status: '',
    //                     id: DEFAULT_ID
    //                 }
    //             }
    //         }

    //         const result = await _userService.create(input)
    //         assert.deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    //     })

    //     it(`should save todo item with late status when the property is further than today`, async () => {
    //         const properties = {
    //             text: 'I must plan my trip to Europe',
    //             when: new Date('2020-12-01 12:00:00 GMT-0')
    //         }

    //         const input = new Todo(properties)
    //         const expected = { ...properties, status: 'late', id: DEFAULT_ID }

    //         const today = new Date('2020-12-02')
    //         _sandbox.useFakeTimers(today.getTime())

    //         await _userService.create(input)

    //         const fnMock = _dependencies.userRepository.create.mock
    //         assert.strictEqual(fnMock.callCount(), 1)
    //         assert.deepStrictEqual(JSON.stringify(fnMock.calls[0].arguments[0]), JSON.stringify(expected))
    //     })
    // })
})

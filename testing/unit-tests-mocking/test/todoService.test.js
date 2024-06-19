import { describe, it, beforeEach, before, after, afterEach } from 'node:test'
import TodoService from '../src/todoService.js'
import assert from 'node:assert'
import crypto from 'node:crypto'
import Todo from '../src/todo.js'
import sinon from 'sinon'

describe('todoService test suit', () => {
    describe('#list', () => {
        let _todoService
        let _dependencies

        const mockDatabase = [
            {
                text: 'I must meet Chaves da Silva',
                when: new Date('2023-12-01 12:00:00 GMT-0'),
                status: 'late',
                id: '593e284b-a324-41d0-bf5e-1d751a048bab'
            }
        ]

        beforeEach((context) => {
            _dependencies = {
                todoRepository: {
                    list: context.mock.fn(async () => mockDatabase)
                }
            }
            _todoService = new TodoService(_dependencies)
        })

        it('should return a list of items with uppercase text', async () => {
            const expected = mockDatabase
                .map(({text, ...result}) => (new Todo({ text: text.toUpperCase(), ...result })))

            const result = await _todoService.list()
            assert.deepStrictEqual(result, expected)

            const fnMock = _dependencies.todoRepository.list.mock
            assert.deepStrictEqual(fnMock.callCount(), 1)
        })
    })

    describe('#create', () => {
        let _todoService
        let _dependencies
        let _sandbox

        const mockCreateResult = {
            text: 'I must meet Chaves da Silva',
            when: new Date('2020-12-01 12:00:00 GMT-0'),
            status: 'late',
            id: '593e284b-a324-41d0-bf5e-1d751a048bab'
          }

        const DEFAULT_ID = mockCreateResult.id
        before(() => {
            // É feito esse ajuste do crypto para não depender do ambiente
            crypto.randomUUID = () => DEFAULT_ID
            _sandbox = sinon.createSandbox()
        })
        after(async () => {
            crypto.randomUUID = (await import('node:crypto')).randomUUID // manual reset
        })
        afterEach(() => _sandbox.restore())
        beforeEach((context) => {
            _dependencies = {
                todoRepository: {
                    create: context.mock.fn(async () => mockCreateResult)
                }
            }
            _todoService = new TodoService(_dependencies)
        })

        it(`shouldn't save todo item with invalid date`, async () => {
            const input = new Todo({
                text: '',
                when: '',
            })

            const expected = {
                error: {
                    message: 'invalid data',
                    data: {
                        text: '',
                        when: '',
                        status: '',
                        id: DEFAULT_ID
                    }
                }
            }

            const result = await _todoService.create(input)
            assert.deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
        })

        it(`should save todo item with late status when the property is further than today`, async () => {
            const properties = {
                text: 'I must plan my trip to Europe',
                when: new Date('2020-12-01 12:00:00 GMT-0')
            }

            const input = new Todo(properties)
            const expected = { ...properties, status: 'late', id: DEFAULT_ID }

            const today = new Date('2020-12-02')
            _sandbox.useFakeTimers(today.getTime())

            await _todoService.create(input)

            const fnMock = _dependencies.todoRepository.create.mock
            assert.strictEqual(fnMock.callCount(), 1)
            assert.deepStrictEqual(JSON.stringify(fnMock.calls[0].arguments[0]), JSON.stringify(expected))
        })
    })
})
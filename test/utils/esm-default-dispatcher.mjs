import { createServer } from 'node:http'
import { test } from 'node:test'
import undici from '../../index.js'

test('default import top-level request works with opts.dispatcher', async (t) => {
  t.plan(4)

  const server = createServer({ joinDuplicateHeaders: true }, (req, res) => {
    t.assert.strictEqual(req.method, 'GET')
    t.assert.strictEqual(req.url, '/')
    res.end('ok')
  })

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))

  const dispatcher = new undici.Agent()

  t.after(async () => {
    await dispatcher.close()
    await new Promise((resolve) => server.close(resolve))
  })

  const { statusCode, body } = await undici.request(`http://127.0.0.1:${server.address().port}`, {
    dispatcher
  })

  t.assert.strictEqual(statusCode, 200)
  t.assert.strictEqual(await body.text(), 'ok')
})

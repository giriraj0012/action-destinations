import nock from 'nock'
import { createTestEvent, createTestIntegration } from '@segment/actions-core'
import Destination from '../../index'

const testDestination = createTestIntegration(Destination)

describe('Ambee.subscribeUserToCampaign', () => {
  
  it('should work', async () => {
    nock('https://segment-api.ambeedata.com').post('/v1/campaign-info').reply(200, {})
  
    const responses = await testDestination.testAction('subscribeUserToCampaign', {
      mapping: { campaignId: 'test-campaign-id', userId: 'user-id-1', airQualitySubscription: 'hazardous', pollenSubscription: 'very_high', ipAddress: '10.0.0.0' },
      settings: {email:'test@test.com'}
    })

    expect(responses.length).toBe(1)
    expect(responses[0].status).toBe(200)
    expect(responses[0].data).toMatchObject({})
  })
})





// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'contacts',
            columns: [

                {
                    name: 'name',
                    type: 'string'
                },
                {
                    name: 'profile_url',
                    type: 'string',
                    isOptional: true,

                },
                {
                    name: 'r_msg',
                    type: 'string',
                    isOptional: true
                },
                {
                    name: 'session_id',
                    type: 'string',
                    isOptional: true
                },
                {
                    name: 'updated_at',
                    type: 'number'
                },
            ]
        }),
        tableSchema({
            name: 'messages',
            columns: [
                {
                    name: 'msg_id',
                    type: 'string',
                    isIndexed: true
                },
                {
                    name: 'uid',
                    type: "string"
                },
                {
                    name: 'message',
                    type: 'string'
                },
                {
                    name: 'send',
                    type: 'string'
                },
                {
                    name: 'type',
                    type: 'string'
                }
            ]
        })
    ]
})

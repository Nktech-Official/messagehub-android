
import { Database, Q } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import { mySchema } from './model/schema'
import migrations from './model/migrations'
import { Contact, MessageData } from './model/Models';
import { logError } from '@nozbe/watermelondb/utils/common';
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema: mySchema,
    migrations,
    dbName: 'msghub',
    jsi: true, /* Platform.OS === 'ios' */
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
    }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        Contact, MessageData
    ],
})


const getRecentMsg = async () => {
    // await addContact({ uid: 'eded', name: 'name', rMsg: 'helo', })
    try {
        const postsCollection = await database.get('contacts').query(Q.sortBy('updated_at', 'desc')
        ).unsafeFetchRaw()
        const count = await database.get('contacts').query(Q.sortBy('updated_at', 'desc')
        ).fetchCount()
        for (let index = 0; index < count; index++) {
            const element = postsCollection[index];
            console.log(element.uid);

        }
        console.log("x", postsCollection);
        return postsCollection;
    } catch (error) {
        console.log(error);

    }



}
const addContact = async ({ uid, name, profileUrl = "https://i.pravatar.cc/300", rMsg, updatedAt = new Date() }) => {
    database.write(async () => {
        try {

            const postsCollection = await database.get('contacts').create(rm => {
                rm._raw.id = uid
                rm.name = name
                rm.profileUrl = profileUrl
                rm.rMsg = rMsg
                rm.updatedAt = updatedAt;
            })
        } catch (error) {
            console.log(error);
        }
    })


}

const addMessage = async (msgId, uid, msg, send, type) => {
    const message = await database.write(async writer => {
        const contact = await database.get('contacts').find(uid);
        const newMsg = await writer.callWriter(() => { contact.addMessage(msgId, uid, msg, send, type) });
        return newMsg;
    })
    return message

}
export { getRecentMsg, addContact, addMessage };



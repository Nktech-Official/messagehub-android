// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { text, date, writer, children, relation } from '@nozbe/watermelondb/decorators'

export class Contact extends Model {
    static table = 'contacts'
    static associations = {
        messages: { type: 'has_many', foreignKey: 'uid' }

    }

    @text('name') name
    @text('profile_url') profileUrl
    @text('session_id') sessionId
    @text('r_msg') rMsg
    @date('updated_at') updatedAt

    @children('messages') messages

    @writer async addMessage(msgId, uid, msg, send, type) {
        const newMsg = await this.collections.get('messages').create(message => {
            message.contact.set(this);
            message.uid = uid;
            message.msgId = msgId;
            message.message = msg;
            message.send = send;
            message.type = type;
        })
        return newMsg;
    }



}

export class MessageData extends Model {
    static table = 'messages'
    static associations = {
        contacts: { type: 'belongs_to', key: 'uid' }

    }
    @text('msg_id') msgId
    @text('uid') uid
    @text('message') message
    @text('send') send
    @text('type') type
    @relation('contacts', 'uid') contact


    // @writer async addMessage(){
    //     this.cre
    // }


}


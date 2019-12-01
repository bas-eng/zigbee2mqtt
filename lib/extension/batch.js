const settings = require('../util/settings');
const logger = require('../util/logger');
const assert = require('assert');
const topicRegex = new RegExp(`^${settings.get().mqtt.base_topic}/bridge/batch/exec$`);
const BaseExtension = require('./baseExtension');

class Batch extends BaseExtension {
    onMQTTConnected() {
        logger.info("Batch - On connect")
		this.mqtt.subscribe(`${settings.get().mqtt.base_topic}/bridge/batch/exec`);
    }

    async onMQTTMessage(topic, message) {
        if (!topic.match(topicRegex)) {
            return null;
        }
		logger.info("Batch - onMQTTMessage: " + message)
		
		return true;
        
    }
	
	//async onZigbeeStarted() {
	//	logger.info("Batch - onZigbeeStarted")
	//}
	
	//async onZigbeeEvent(type, data, mappedDevice, settingsDevice) {
	//	logger.info("Batch - onZigbeeEvent")
	//}
	
	//async stop() {
	//	logger.info("Batch - stop")
	//}
}

module.exports = Batch;

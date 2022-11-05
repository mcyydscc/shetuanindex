const commands = String.raw`root@didctf.com/:~ cd Hacker
root@didctf.com/Hacker/:~ ls`;

const who = String.raw`

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# 数据安全协创社团由电子取证社团与网络特攻社团合并成立。
# 社团旨在通过开展学习、讨论、实践、研究等各种活动，让同学们对网络攻防技术、网络犯罪侦察与取证和人工智能有更全面、更透彻的认识
# 扩展理论知识，获得理论联系实际的实践机会，提高专业技能水平以及培养学生的职业素质。

# 数据安全协创社团的成员大都对电子取证以及CTF比赛有着浓厚的兴趣，在多次大型赛事中获得优异成绩。
# 如“美亚杯”中国电子数据取证竞赛、“长安杯”电子数据取证竞赛中多次获奖。
# 社团对于网络安全知识学期尤为重视，经常组织各类社团内部赛，社团学习等。通过此类活动达到以赛促学，更好的帮助成员学习知识。

# 更多信息请访问: <a href="https://www.didctf.com/docs/">https://www.didctf.com/docs/</a>
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #`;

const honors = String.raw`

2022年：

2022网信柏鹭杯 优秀奖
2022第四届长安杯电子数据取证 一等奖
2022第四届长安杯电子数据取证 二等奖
2022第四届长安杯电子数据取证 三等奖
2022第四届长安杯电子数据取证 优秀奖

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


2021年：

2021中科实数杯 三等奖
2021中科实数杯 优胜奖
2021第三届长安杯电子数据取证竞赛 三等奖

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


2020年：

2020美亚杯中国电子数据取证团体 三等奖

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


2019年：

2019美亚杯中国电子数据取证团体赛 二等奖
2019美亚杯中国电子数据取证团体赛 三等奖
2019中科实数杯纪念奖

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


2018年：

iCAN国际创新创业大赛中国总决赛 一等奖
中国网络安全技能竞赛“观安杯”管理运维赛高校组 一等奖

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

`;

let blink = document.querySelector('.blink');
const code = document.querySelector('.code');

const RandomNumber = (min, max) => {
	return Math.floor(Math.random() * max) + min
};

const Delay = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time))
};

const ResetTerminal = () => {
	code.innerHTML = '<span class="blink">█</span>';
	blink = document.querySelector('.blink');
};

const RenderString = characters => {
	blink.insertAdjacentHTML('beforeBegin', characters);
};

const TypeString = async characters => {
	for(const character of characters.split('')) {
		await Delay(RandomNumber(50, 100));
		RenderString(character);
	}
}

const DrawLines = async ( characters, min = 50, max = 500 ) => {
	for(const line of characters.split('\n')) {
		await Delay(RandomNumber(min, max));
		RenderString(`${line}\n`);
	}
}

const DrawCommands = async commands => {
	for( const line of commands.split('\n')){
		// Seperate the directory and the command
		const [currentDir, command] = line.split(':~ ');

		// Print the directory, type the command and finish with new line
		RenderString(`${currentDir}:~ `);
		await TypeString(command);
		RenderString('\n');
	}
}


// Start the code
(async()=> {
	await DrawCommands("/:~ ssh root@didctf.com");
	await Delay(1000);
	RenderString("root@didctf.com password:");
	await Delay(2000);
	RenderString("\n");
	await DrawCommands(commands);
	RenderString('\nWho_we_are.txt    honors.txt\n\n');
	await DrawCommands('root@didctf.com/Hacker:~ cat Who_we_are.txt');
	await DrawLines( who );
	await TypeString("\n\nYou don't seem to be interested in the introduction of the society, so please take a look at our honors");
	await Delay(4000);
	ResetTerminal();
    await DrawCommands('root@didctf.com/Hacker:~ cat honors.txt');
    await DrawLines(honors);
})();
const fs = require('fs');
const readline = require('readline');

// 生成一个随机字符串
function generateRandomString(length, characters) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// 生成随机用户名,仅包含大小写字符
function generateRandomUsername() {
    const length = Math.floor(Math.random() * 6) + 5; // 产生5到10之间的随机数
    return generateRandomString(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
}

// 生成随机密码（大小写数字和少量特殊字符）
function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*.+-=';
    return generateRandomString(length, characters);
}

// 写入账户数据到同目录下RandomAccount.txt
function writeAccountToFile(username, password) {
    const accountStr = `account: ${username}, password: ${password}\n`;
    fs.writeFileSync('RandomAccount.txt', accountStr, { flag: 'a' });
}

// 主函数
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('输入用户名+密码长度（用户名空则为生成一个五到十的名字，格式示例：user+12）: ', (input) => {
        let [username, passwordLength] = input.split('+');
        if (!username) {
            username = generateRandomUsername(); // 如果没有输入用户名就生成一个随机用户名
        }

        if (isNaN(passwordLength) || passwordLength <= 0) {
            console.log('密码长度为正整数。');
            rl.close();
            return;
        }

        const password = generateRandomPassword(parseInt(passwordLength));
        writeAccountToFile(username, password);
        console.log(`生成信息储存在同目录RandomAccount.txt，账户信息为：\n账号：${username}\n密码：${password}`);
        
        rl.close();
    });
}

// 启动主函数
main();
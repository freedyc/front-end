const getCopyright = () => `©️2016-${new Date().getFullYear()} Freedyc`

test('测试版权信息', () => {
    expect(getCopyright()).toEqual('©️2016-2021 Freedyc')
})

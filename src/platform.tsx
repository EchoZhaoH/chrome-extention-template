import * as React from 'react'
import * as Url from 'url-parse'
import { InputGroup, NumericInput, Button, Intent, FormGroup } from '@blueprintjs/core'

const protocol = 'http:'
const defaultReqHost = ''
const defaultBaseHost = ''
const defaultNum = 20
const path = 'template_diff'

export function Platform() {
    const [reqHost, setReqHost] = React.useState<string>(defaultReqHost)
    const [baseHost, setBaseHost] = React.useState<string>(defaultBaseHost)
    const [testHost, setTestHost] = React.useState<string>('')
    const [testTemp, setTestTemp] = React.useState<string>('')
    const [num, setNum] = React.useState<number>(defaultNum);

    const submit = React.useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!testTemp || !testHost) {
            alert('请填写模板或者测试机地址')
            return
        }
        const search = [
            ['base_host', baseHost],
            ['test_host', testHost],
            ['test_temp', testTemp],
            ['num', num]
        ]
        const redirectLink = `${protocol}//${reqHost || defaultReqHost}/${path}?${search.map(i => `${i[0]}=${i[1]}`).join('&')}`
        chrome.tabs.create({url: redirectLink})
    }, [reqHost, testHost, testTemp, num, baseHost])
    // 获取当前 host
    const getHost = React.useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) {
            e.preventDefault()
        }
        chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
            const selected = tabs[0]
            if (!selected || !selected.url) return
            setTestHost(new Url(selected.url).host)
        })
    }, []);
    React.useEffect(() => {
        getHost()
    }, [])
    return (
        <div className="container">
            <form onSubmit={submit}>
                <FormGroup label="请求地址">
                    <InputGroup 
                        value={reqHost}
                        placeholder={defaultReqHost}
                        onChange={e => setReqHost(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="基线地址">
                    <InputGroup
                        value={baseHost}
                        placeholder={defaultBaseHost}
                        onChange={e => setBaseHost(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="测试机地址">
                    <InputGroup 
                        value={testHost}
                        placeholder="test.test.com:host"
                        onChange={e => setTestHost(e.target.value)}
                        rightElement={<Button icon="refresh" intent={Intent.SUCCESS} onClick={getHost}  />}
                    />
                </FormGroup>
                <FormGroup label="测试模板">
                    <InputGroup 
                        value={testTemp}
                        placeholder="template"
                        onChange={e => setTestTemp(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="模板数量">
                    <NumericInput 
                        value={num}
                        placeholder="20"
                        onValueChange={v => setNum(v)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button onClick={submit}>生成模板 diff 地址</Button>
                </FormGroup>
            </form>
        </div>
    )
}
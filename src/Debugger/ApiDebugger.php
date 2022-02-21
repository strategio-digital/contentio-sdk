<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Debugger;

use Tracy\IBarPanel;

class ApiDebugger implements IBarPanel
{
    /** @var array<int|string, mixed> */
    protected array $delays = [];
    
    /** @var array<int, string> */
    protected array $requestKeys = [];
    
    protected string $poolName;
    
    protected int $poolsCount = 0;
    
    public function start(string $name): void
    {
        $this->poolName = $name;
        $this->poolsCount++;
        
        $this->delays[$this->poolKey()] = [
            'id' => $this->poolsCount,
            'name' => $name,
            'startedAt' => microtime(true),
            'delay' => 0,
            'requests' => []
        ];
    }
    
    public function stop(): void
    {
        $this->delays[$this->poolKey()]['delay'] = (microtime(true) - $this->delays[$this->poolKey()]['startedAt']) * 1000;
        $this->delays[$this->poolKey()]['requests'] = $this->requestKeys;
        $this->requestKeys = [];
    }
    
    public function addRequestKey(string $name): void
    {
        $this->requestKeys[] = $name;
    }
    
    public function getTab(): string
    {
        return '
        <span title="Vysvětlující popisek">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" style="color: #0027ab">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>
            <span class="tracy-label">' . $this->countRequests() . ' / ' . number_format($this->sumDelays(), 1, '.') . 'ms' . '</span>
        </span>';
    }
    
    public function getPanel(): string
    {
        $trs = array_map(fn($key, $value) => "
        <tr>
            <td>{$value['id']}</td>
            <td>{$value['name']}</td>
            <td>". implode(', ', $value['requests']) ."</td>
            <td>". count($value['requests']) ."</td>
            <td>". number_format($value['delay'], 1, '.') . 'ms' ."</td>
        </tr>", array_keys($this->delays), $this->delays);
        
        return "
            <h1>API calls (". $this->countRequests() .")</h1>
            <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Pool name</th>
                <th>Request keys</th>
                <th>Count</th>
                <th>Pool delay</th>
            </tr>
            </thead>
            <tbody>" . implode('', $trs) . "</tbody>
            </table>
        ";
    }
    
    protected function sumDelays(): float
    {
        return array_reduce($this->delays, fn($prev, $current) => $prev + $current['delay'], 0);
    }
    
    protected function poolKey(): string
    {
        return $this->poolsCount . '_' . $this->poolName;
    }
    
    protected function countRequests(): int
    {
        return array_reduce($this->delays, fn($prev, $current) => $prev + count($current['requests']), 0);
    }
}
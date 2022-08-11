package com.led.hellospring.service;

import com.led.hellospring.domain.Member;
import com.led.hellospring.repository.MemberRepository;
import com.led.hellospring.repository.MemoryMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public class MemberService {
    private final MemberRepository memberRepository;


    public MemberService(MemberRepository memberRepository) {   // DI (dependency injection), 의존 관계 설정
        this.memberRepository = memberRepository;
    }

    /**
     * 회원 가입
     */
    public Long join (Member member) {
        /* 회원 이름 중복 확인 */
        validateDuplicateMember(member);

        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        //        Optional<Member> result = memberRepository.findByName(member.getName());
        //        result.ifPresent(m -> {
        //            throw new IllegalStateException("이미 존재하는 회원입니다.");
        //        });

        memberRepository.findByName(member.getName())
            .ifPresent(m -> {
                throw new IllegalStateException("이미 존재하는 회원입니다.");
            });
    }

    /**
     * 전체 회원 조회
     */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
